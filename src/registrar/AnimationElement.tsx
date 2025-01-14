import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { pestsRegistrar, RegisteredObject } from './registrar';
import { Mouse } from '../mouse/classMouse';
import InOutMouse from './InOutMouse';

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
type AnimationObject = DomElPosition & RegisteredObject;

export default function AnimationElement({ animationPeriodicity = 10, disabled = false }: Props) {
    const [animationObject, setAnimationObject] = useState<AnimationObject | null>(null);

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
                return;
            }
            const { domEl } = registeredObject;
            const domRect = domEl.getBoundingClientRect();

            setAnimationObject({
                left: domRect.left,
                right: domRect.right,
                top: domRect.top,
                bottom: domRect.bottom,
                ...registeredObject,
            });
            timerId = setTimeout(doAnimation, animationInterval);
        };

        timerId = setTimeout(doAnimation, animationInterval);

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [animationPeriodicity, needSetTimer]);

    useEffect(() => {
        function onResize() {
            if (animationObject === null) {
                return;
            }

            const { domEl } = animationObject;
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

    const pestsNode = pestsRegistrar.pestsDomContainer;

    if (disabled || animationObject === null) {
        return null;
    }

    const { animationDirection, animationHeight } = animationObject;
    const isTurnedLeft = animationDirection === 'left';
    const height = animationHeight;
    const width = Mouse.getWidthByHeight(height);

    return ReactDOM.createPortal(
        <InOutMouse
            left={
                isTurnedLeft
                    ? animationObject.left - width + window.scrollX
                    : animationObject.right + window.scrollX
            }
            top={animationObject.bottom - height - animationObject.animationBottom + window.scrollY}
            height={height}
            animationDirection={animationDirection}
            animationDelay={0}
            onAnimationEnd={() => {
                pestsRegistrar.setObjectIsNotShowing(animationObject.key);
                setAnimationObject(null);
            }}
        />,
        pestsNode,
    );
}
