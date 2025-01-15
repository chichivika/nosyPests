import React, { useState, useEffect } from 'react';
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
    const [animationObject, setAnimationObject] = useAnimationObject(
        animationPeriodicity,
        disabled,
    );

    if (disabled || animationObject === null) {
        return null;
    }

    const { animationDirection, height, animationBottom, animationDelay } = animationObject;
    const isTurnedLeft = animationDirection === 'left';
    const width = Mouse.getWidthByHeight(height);

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
                pestsRegistrar.setObjectIsNotShowing(animationObject.key);
                setAnimationObject(null);
            }}
        />,
        pestsRegistrar.pestsDomContainer,
    );
}

function useWindowResize([animationObject, setAnimationObject]: [
    AnimationObject | null,
    React.Dispatch<React.SetStateAction<AnimationObject | null>>,
]) {
    useEffect(() => {
        function onResize() {
            if (animationObject === null) {
                return;
            }

            const domEl = pestsRegistrar.getDomElByKey(animationObject.key);
            if (domEl === null) {
                window.removeEventListener('resize', onResize);
                return;
            }

            const domRect = domEl.getBoundingClientRect();
            setAnimationObject({
                ...animationObject,
                left: domRect.left,
                right: domRect.right,
                top: domRect.top,
                bottom: domRect.bottom,
            });
        }
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    });
}

function useWindowWheel([animationObject, setAnimationObject]: [
    AnimationObject | null,
    React.Dispatch<React.SetStateAction<AnimationObject | null>>,
]) {
    useEffect(() => {
        function clearAnimation() {
            if (animationObject === null) {
                return;
            }
            pestsRegistrar.setObjectIsNotShowing(animationObject.key);
            setAnimationObject(null);
        }
        window.addEventListener('mousemove', clearAnimation);
        window.addEventListener('wheel', clearAnimation);

        return () => {
            window.removeEventListener('mousemove', clearAnimation);
            window.removeEventListener('wheel', clearAnimation);
        };
    });
}

function useAnimationPauseTimer(
    [animationObject, setAnimationObject]: [
        AnimationObject | null,
        React.Dispatch<React.SetStateAction<AnimationObject | null>>,
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

            setAnimationObject({
                left: domRect.left,
                right: domRect.right,
                top: domRect.top,
                bottom: domRect.bottom,
                key,
                ...settings,
            });
            timerId = setTimeout(doAnimation, animationInterval);
        };

        timerId = setTimeout(doAnimation, animationInterval);

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [animationPeriodicity, needSetTimer, setAnimationObject]);
}

function useAnimationObject(animationPeriodicity: number, disabled: boolean) {
    const [animationObject, setAnimationObject] = useState<AnimationObject | null>(null);

    useAnimationPauseTimer([animationObject, setAnimationObject], animationPeriodicity, disabled);
    useWindowResize([animationObject, setAnimationObject]);
    useWindowWheel([animationObject, setAnimationObject]);

    return [animationObject, setAnimationObject] as [
        AnimationObject | null,
        React.Dispatch<React.SetStateAction<AnimationObject | null>>,
    ];
}
