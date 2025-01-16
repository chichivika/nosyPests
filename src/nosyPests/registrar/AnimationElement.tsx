import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { pestsRegistrar } from './registrar';
import { Mouse } from '../mouse/classMouse';
import InOutMouse from '../mouse/InOutMouse';
import {
    updatePositionAfterParentScroll,
    updatePositionAfterWindowResize,
    updateMovedElByTarget,
} from '../utils/useAnimation';
import animationPortal from '../utils/portal';

type Props = {
    animationPeriodicity?: number;
    disabled?: boolean;
};

export default function AnimationElement({ animationPeriodicity = 10, disabled = false }: Props) {
    const [animationKey, setAnimationKey] = useAnimationKey({
        animationPeriodicity,
        disabled,
    });
    const movedRef = usePositionUpdate(animationKey, disabled);

    if (disabled || animationKey === null) {
        return null;
    }

    const registeredObject = pestsRegistrar.getRegisteredObjectByKey(animationKey);
    if (registeredObject === null) {
        return null;
    }

    const { animationDirection, height, animationDelay, key, disablePortal, containerEl } =
        registeredObject;

    const renderContainer =
        containerEl !== null ? containerEl : animationPortal.getPestsContainer();

    return ReactDOM.createPortal(
        <InOutMouse
            ref={movedRef}
            height={height}
            animationDirection={animationDirection}
            animationDelay={animationDelay}
            outerPosition={disablePortal ? 'absolute' : 'fixed'}
            onAnimationEnd={() => {
                setAnimationKey(null);
                pestsRegistrar.setObjectIsNotShowing(key);
            }}
        />,
        renderContainer,
    );
}

function usePositionUpdate(animationKey: string | null, disabled: boolean) {
    const movedRef = useRef<HTMLDivElement>(null);

    const animationParam = useMemo(() => {
        if (disabled || animationKey === null) {
            return null;
        }
        const registeredObject = pestsRegistrar.getRegisteredObjectByKey(animationKey);
        if (registeredObject === null || registeredObject.disablePortal) {
            return null;
        }

        return {
            targetDomEl: registeredObject.targetEl,
            animationDirection: registeredObject.animationDirection,
            isInside: registeredObject.isInside,
            width: Mouse.getWidthByHeight(registeredObject.height),
            height: registeredObject.height,
            animationBottom: registeredObject.animationBottom,
        };
    }, [disabled, animationKey]);

    useLayoutEffect(() => {
        if (animationParam === null || movedRef.current === null) {
            return;
        }
        updateMovedElByTarget({ ...animationParam, movedDomEl: movedRef.current });
    }, [animationParam, movedRef]);

    useLayoutEffect(() => {
        if (animationParam === null || movedRef.current === null) {
            return;
        }

        const updateParam = { ...animationParam, movedDomEl: movedRef.current };

        const clearResizeListener = updatePositionAfterWindowResize(updateParam);
        const clearScrollListener = updatePositionAfterParentScroll(updateParam);

        return () => {
            clearResizeListener();
            clearScrollListener();
        };
    }, [animationParam, movedRef]);

    return movedRef;
}

function useAnimationPauseTimer(
    [animationKey, setAnimationKey]: [
        string | null,
        React.Dispatch<React.SetStateAction<string | null>>,
    ],
    animationPeriodicity: number,
    disabled: boolean,
) {
    const needSetTimer = !disabled && animationKey === null;
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

            setAnimationKey(registeredObject.key);
            timerId = setTimeout(doAnimation, animationInterval);
        };

        timerId = setTimeout(doAnimation, animationInterval);

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [animationPeriodicity, needSetTimer, setAnimationKey]);
}

function useAnimationKey({
    animationPeriodicity,
    disabled,
}: {
    animationPeriodicity: number;
    disabled: boolean;
}) {
    const [animationKey, setAnimationKey] = useState<string | null>(null);
    useAnimationPauseTimer([animationKey, setAnimationKey], animationPeriodicity, disabled);

    return [animationKey, setAnimationKey] as [
        string | null,
        React.Dispatch<React.SetStateAction<string | null>>,
    ];
}
