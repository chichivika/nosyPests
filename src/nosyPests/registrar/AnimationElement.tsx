/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useReducer, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { pestsRegistrar, AnimationSettings } from './registrar';
import { Mouse } from '../mouse/classMouse';
import InOutMouse from '../mouse/InOutMouse';

type Props = {
    animationPeriodicity?: number;
    disabled?: boolean;
};
type DomElPosition = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

type AnimationObject = DomElPosition &
    AnimationSettings & {
        key: string;
    };

export default function AnimationElement({ animationPeriodicity = 10, disabled = false }: Props) {
    const [animationObject, dispatchAnimationObject] = useAnimationObject(
        animationPeriodicity,
        disabled,
    );

    if (disabled || animationObject === null) {
        return null;
    }

    const { animationDirection, height, animationBottom, animationDelay } = animationObject;
    const isTurnedLeft = animationDirection === 'left';
    const width = Mouse.getWidthByHeight(height);

    console.log(
        `render animationRlement scroll bottom: 
        ${animationObject.bottom}`,
    );
    console.log(
        `render animationRlement top: 
        ${animationObject.bottom - height - animationBottom + window.scrollY}`,
    );
    return ReactDOM.createPortal(
        <InOutMouse
            left={
                isTurnedLeft
                    ? animationObject.left - width + window.scrollX
                    : animationObject.right + window.scrollX
            }
            top={animationObject.bottom - height - animationBottom + window.scrollY}
            height={height}
            animationDirection={animationDirection}
            animationDelay={animationDelay}
            outerPosition='fixed'
            onAnimationEnd={() => {
                dispatchAnimationObject({ type: 'clear' });
            }}
        />,
        pestsRegistrar.pestsDomContainer,
    );
}

function useWindowResize(
    animationKey: string | null,
    dispatchAnimationObject: React.Dispatch<AnimationObjectAction>,
) {
    useLayoutEffect(() => {
        if (animationKey === null) {
            return;
        }
        console.log(` useWindowResize animationKey ${animationKey}`);
        function onResize() {
            if (animationKey === null) {
                return;
            }
            const domEl = pestsRegistrar.getDomElByKey(animationKey);
            if (domEl === null) {
                return;
            }

            const domRect = domEl.getBoundingClientRect();
            console.log(`onScroll bottom: ${domRect.bottom}`);
            dispatchAnimationObject({
                type: 'updateDomPosition',
                payload: {
                    left: domRect.left,
                    right: domRect.right,
                    top: domRect.top,
                    bottom: domRect.bottom,
                },
            });
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
    }, [animationKey, dispatchAnimationObject]);
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
            const domRect = domEl.getBoundingClientRect();

            dispatchAnimationObject({
                type: 'set',
                payload: {
                    left: domRect.left,
                    right: domRect.right,
                    top: domRect.top,
                    bottom: domRect.bottom,
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

type AnimationObjectState = AnimationObject | null;
type AnimationObjectAction =
    | {
          type: 'clear';
      }
    | {
          type: 'set';
          payload: AnimationObject;
      }
    | {
          type: 'updateDomPosition';
          payload: DomElPosition;
      };
function animationObjectReducer(state: AnimationObjectState, action: AnimationObjectAction) {
    switch (action.type) {
        case 'clear':
            if (state === null) {
                return state;
            }
            pestsRegistrar.setObjectIsNotShowing(state.key);
            return null;
        case 'updateDomPosition':
            if (state !== null) {
                return { ...state, ...action.payload };
            }
            return state;
        case 'set':
            return action.payload;
        default:
            return state;
    }
}

function useAnimationObject(animationPeriodicity: number, disabled: boolean) {
    const [animationObject, dispatchAnimationObject] = useReducer(animationObjectReducer, null);

    useAnimationPauseTimer(
        [animationObject, dispatchAnimationObject],
        animationPeriodicity,
        disabled,
    );
    useWindowResize(animationObject?.key || null, dispatchAnimationObject);

    return [animationObject, dispatchAnimationObject] as [
        AnimationObject | null,
        React.Dispatch<AnimationObjectAction>,
    ];
}
