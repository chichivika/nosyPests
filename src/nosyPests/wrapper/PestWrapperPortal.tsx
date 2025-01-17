/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useLayoutEffect, useMemo, RefObject, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import InOutMouse from '../mouse/InOutMouse';
import { defaultGeneralSettings } from '../utils/animation';
import animationPortal from '../utils/portal';
import { PestWrapperGeneralParam, useDoingAnimation } from './utils';
import {
    updatePositionAfterParentScroll,
    updatePositionAfterWindowResize,
    updateMovedElByTarget,
} from '../utils/useAnimation';
import { AnimationDirection } from '../utils/types';
import { Mouse } from '../mouse/classMouse';

export default function PestWrapperPortal({
    children,
    disabled = false,
    ref,
    animationPause = 20,
    ...generalAnimationSettings
}: PestWrapperGeneralParam) {
    const fullAnimationSettings = {
        ...defaultGeneralSettings,
        ...generalAnimationSettings,
    };
    const { height, animationDirection, isInside, animationBottom, onAnimationEnd } =
        fullAnimationSettings;

    const [doingAnimation, setDoingAnimation] = useDoingAnimation(animationPause, disabled);
    const [targetRef, movedRef] = usePositionUpdate({
        disabled,
        doingAnimation,
        animationDirection,
        isInside,
        height,
        animationBottom,
    });

    useImperativeHandle(ref, () => {
        return targetRef.current;
    });

    const needShowPest = !disabled && doingAnimation;
    const Child = React.Children.only(children);

    const InOutPest = (
        <InOutMouse
            left={0}
            top={0}
            ref={movedRef}
            height={height}
            animationDirection={animationDirection}
            animationDuration={fullAnimationSettings.animationDuration}
            animationDelay={fullAnimationSettings.animationDelay}
            onAnimationEnd={() => {
                setDoingAnimation(false);
                onAnimationEnd?.();
            }}
        />
    );

    return (
        <>
            {React.cloneElement(Child, { ref: targetRef })}
            {needShowPest && ReactDOM.createPortal(InOutPest, animationPortal.getPestsContainer())}
        </>
    );
}

function usePositionUpdate({
    disabled,
    doingAnimation,
    animationDirection,
    isInside,
    height,
    animationBottom,
}: {
    disabled: boolean;
    doingAnimation: boolean;
    animationDirection: AnimationDirection;
    isInside: boolean;
    height: number;
    animationBottom: number;
}) {
    const targetRef = useRef<HTMLElement>(null);
    const movedRef = useRef<HTMLDivElement>(null);

    const animationParam = useMemo(() => {
        if (!doingAnimation || disabled) {
            return null;
        }

        return {
            animationDirection,
            isInside,
            width: Mouse.getWidthByHeight(height),
            height,
            animationBottom,
        };
    }, [doingAnimation, disabled, animationDirection, isInside, height, animationBottom]);

    useLayoutEffect(() => {
        if (movedRef.current === null || targetRef.current === null) {
            return;
        }
        if (animationParam !== null) {
            updateMovedElByTarget({
                ...animationParam,
                movedDomEl: movedRef.current,
                targetDomEl: targetRef.current,
            });
        }
    }, [movedRef, targetRef, animationParam]);

    useLayoutEffect(() => {
        if (animationParam === null || movedRef.current === null || targetRef.current === null) {
            return;
        }

        const updateParam = {
            ...animationParam,
            movedDomEl: movedRef.current,
            targetDomEl: targetRef.current,
        };
        const clearResizeListener = updatePositionAfterWindowResize(updateParam);
        const clearScrollListener = updatePositionAfterParentScroll(updateParam);

        return () => {
            clearResizeListener();
            clearScrollListener();
        };
    }, [movedRef, targetRef, animationParam]);

    return [targetRef, movedRef] as [RefObject<HTMLElement>, RefObject<HTMLDivElement>];
}
