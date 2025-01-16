import React, { useReducer, useEffect, useLayoutEffect, useRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { pestsRegistrar, AnimationSettings } from './registrar';
import { Mouse } from '../mouse/classMouse';
import InOutMouse, { getPxStringIfExists } from '../mouse/InOutMouse';
import { getAnimationPosition as getNotPortalAnimationPosition } from '../wrapper/MouseWrapper';

type Props = {
    animationPeriodicity?: number;
    disabled?: boolean;
};

type AnimationObject = AnimationSettings & {
    key: string;
    disablePortal: boolean;
};

type DomElRect = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

type DomElPosition = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};

export default function AnimationElement({ animationPeriodicity = 10, disabled = false }: Props) {
    const inOutRef = useRef<HTMLDivElement>(null);
    const [animationObject, dispatchAnimationObject] = useAnimationObject({
        animationPeriodicity,
        disabled,
        inOutRef,
    });

    if (disabled || animationObject === null) {
        return null;
    }

    const { animationDirection, height, animationDelay, key, disablePortal } = animationObject;

    const renderContainer = pestsRegistrar.getRenderElByKey(key);
    if (renderContainer === null) {
        return null;
    }

    return ReactDOM.createPortal(
        <InOutMouse
            ref={inOutRef}
            height={height}
            animationDirection={animationDirection}
            animationDelay={animationDelay}
            outerPosition={disablePortal ? 'absolute' : 'fixed'}
            onAnimationEnd={() => {
                dispatchAnimationObject({ type: 'clear' });
            }}
        />,
        renderContainer,
    );
}

function useWindowResize(
    animationKey: string | null,
    dispatchAnimationObject: React.Dispatch<AnimationObjectAction>,
    inOutRef: RefObject<HTMLDivElement>,
) {
    useLayoutEffect(() => {
        if (animationKey === null) {
            return;
        }

        if (pestsRegistrar.getDisablePortalByKey(animationKey)) {
            return;
        }

        function onResize() {
            if (animationKey === null || inOutRef.current === null) {
                return;
            }
            const domEl = pestsRegistrar.getDomElByKey(animationKey);
            const settings = pestsRegistrar.getAnimationSettingsByKey(animationKey);
            if (domEl === null || settings === null) {
                return;
            }

            const domRect = domEl.getBoundingClientRect();
            const position = getPositionBySettings({
                domElRect: {
                    left: domRect.left,
                    right: domRect.right,
                    top: domRect.top,
                    bottom: domRect.bottom,
                },
                settings,
                disablePortal: pestsRegistrar.getDisablePortalByKey(animationKey),
            });
            inOutRef.current.style.left = getPxStringIfExists(position.left) || '';
            inOutRef.current.style.right = getPxStringIfExists(position.right) || '';
            inOutRef.current.style.top = getPxStringIfExists(position.top) || '';
            inOutRef.current.style.bottom = getPxStringIfExists(position.bottom) || '';
        }

        function addScrollEventListener(node: HTMLElement | null) {
            if (node === null) {
                return;
            }
            node.addEventListener('scroll', onResize);
            addScrollEventListener(node.parentElement);
        }

        function clearScrollEventListener(node: HTMLElement | null) {
            if (node === null) {
                return;
            }
            node.removeEventListener('scroll', onResize);
            clearScrollEventListener(node.parentElement);
        }

        window.addEventListener('resize', onResize);

        const domEl = pestsRegistrar.getDomElByKey(animationKey);
        addScrollEventListener(domEl);

        return () => {
            window.removeEventListener('scroll', onResize);
            clearScrollEventListener(domEl);
        };
    }, [animationKey, dispatchAnimationObject, inOutRef]);
}

function useInOutCoordinates(
    animationObject: AnimationObject | null,
    inOutRef: RefObject<HTMLDivElement>,
) {
    useLayoutEffect(() => {
        if (animationObject === null || inOutRef.current === null) {
            return;
        }

        const animationKey = animationObject.key;
        const domEl = pestsRegistrar.getDomElByKey(animationKey);
        const settings = pestsRegistrar.getAnimationSettingsByKey(animationKey);
        if (domEl === null || settings === null) {
            return;
        }

        const domRect = domEl.getBoundingClientRect();
        const position = getPositionBySettings({
            domElRect: {
                left: domRect.left,
                right: domRect.right,
                top: domRect.top,
                bottom: domRect.bottom,
            },
            settings,
            disablePortal: pestsRegistrar.getDisablePortalByKey(animationKey),
        });
        inOutRef.current.style.left = getPxStringIfExists(position.left) || '';
        inOutRef.current.style.right = getPxStringIfExists(position.right) || '';
        inOutRef.current.style.top = getPxStringIfExists(position.top) || '';
        inOutRef.current.style.bottom = getPxStringIfExists(position.bottom) || '';
    }, [animationObject, inOutRef]);
}

function useAnimationPauseTimer(
    [animationObject, dispatchAnimationObject]: [
        AnimationObject | null,
        React.Dispatch<AnimationObjectAction>,
    ],
    animationPeriodicity: number,
    disabled: boolean,
) {
    const needSetTimer = !disabled && animationObject === null;
    useEffect(() => {
        if (!needSetTimer) {
            return;
        }

        let timerId: ReturnType<typeof setTimeout>;
        const animationInterval = animationPeriodicity * 1000;

        const doAnimation = () => {
            const registeredObject = pestsRegistrar.getRandomAnimationObject();
            if (registeredObject === null) {
                timerId = setTimeout(doAnimation, animationInterval);
                return;
            }
            const { domEl, key, ...settings } = registeredObject;

            dispatchAnimationObject({
                type: 'set',
                payload: {
                    key,
                    ...settings,
                },
            });
            timerId = setTimeout(doAnimation, animationInterval);
        };

        timerId = setTimeout(doAnimation, animationInterval);

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [animationPeriodicity, needSetTimer, dispatchAnimationObject]);
}

function getPositionBySettings({
    domElRect,
    settings,
    disablePortal,
}: {
    domElRect: DomElRect;
    settings: AnimationSettings;
    disablePortal: boolean;
}): DomElPosition {
    const width = Mouse.getWidthByHeight(settings.height);
    if (disablePortal) {
        return getNotPortalAnimationPosition({
            isTurnedLeft: settings.animationDirection === 'left',
            animationBottom: settings.animationBottom,
            isInside: settings.isInside,
            width,
        });
    }

    return {
        top: getTopBySettings(domElRect.bottom, settings),
        left: getLeftBySettings(domElRect.left, domElRect.right, settings),
    };
}

function getTopBySettings(domElBottom: number, settings: AnimationSettings) {
    return domElBottom - settings.height - settings.animationBottom + window.scrollY;
}

function getLeftBySettings(domElLeft: number, domElRight: number, settings: AnimationSettings) {
    const width = Mouse.getWidthByHeight(settings.height);
    const isLeft = settings.animationDirection === 'left';

    if (isLeft) {
        return settings.isInside
            ? domElRight + window.scrollX - width
            : domElLeft - width + window.scrollX;
    }
    return settings.isInside ? domElLeft + window.scrollX : domElRight + window.scrollX;
}

type AnimationObjectState = AnimationObject | null;
type AnimationObjectAction =
    | {
          type: 'clear';
      }
    | {
          type: 'set';
          payload: AnimationObject;
      };
function animationObjectReducer(state: AnimationObjectState, action: AnimationObjectAction) {
    switch (action.type) {
        case 'clear':
            if (state === null) {
                return state;
            }
            pestsRegistrar.setObjectIsNotShowing(state.key);
            return null;
        case 'set':
            return action.payload;
        default:
            return state;
    }
}

function useAnimationObject({
    animationPeriodicity,
    disabled,
    inOutRef,
}: {
    animationPeriodicity: number;
    disabled: boolean;
    inOutRef: RefObject<HTMLDivElement>;
}) {
    const [animationObject, dispatchAnimationObject] = useReducer(animationObjectReducer, null);

    useAnimationPauseTimer(
        [animationObject, dispatchAnimationObject],
        animationPeriodicity,
        disabled,
    );
    useInOutCoordinates(animationObject, inOutRef);
    useWindowResize(animationObject?.key || null, dispatchAnimationObject, inOutRef);

    return [animationObject, dispatchAnimationObject] as [
        AnimationObject | null,
        React.Dispatch<AnimationObjectAction>,
    ];
}
