import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { pestsRegistrar, AnimationSettings } from './registrar';
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
export default function AnimationElement({ animationPeriodicity = 10, disabled = false }: Props) {
    const [animationSettings, setAnimationSettings] = useState<AnimationSettings | null>(null);
    const [domElPosition, setDomElPosition] = useState<DomElPosition | null>(null);

    useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;
        const animationInterval = animationPeriodicity * 1000;

        const doAnimation = () => {
            if (disabled) {
                return;
            }
            const registeredObject = pestsRegistrar.getRandomAnimationObject();
            if (registeredObject === null) {
                return;
            }
            const { domEl, ...animationObject } = registeredObject;
            const domRect = domEl.getBoundingClientRect();

            setAnimationSettings(animationObject);
            setDomElPosition({
                left: domRect.left,
                right: domRect.right,
                top: domRect.top,
                bottom: domRect.bottom,
            });
            timerId = setTimeout(doAnimation, animationInterval);
        };

        timerId = setTimeout(doAnimation, animationInterval);

        function onResize() {
            clearInterval(timerId);
        }
        window.addEventListener('resize', onResize);

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
            window.addEventListener('resize', onResize);
        };
    }, [animationPeriodicity, disabled]);

    const pestsNode = pestsRegistrar.pestsDomContainer;

    if (disabled || animationSettings === null || domElPosition === null) {
        return null;
    }

    if (animationSettings.animationName !== 'mouse') {
        return null;
    }

    const { animationDirection, animationHeight } = animationSettings;
    const isTurnedLeft = animationDirection === 'left';
    const height = animationHeight;
    const width = Mouse.getWidthByHeight(height);

    return ReactDOM.createPortal(
        <InOutMouse
            left={
                isTurnedLeft
                    ? domElPosition.left - width + window.scrollX
                    : domElPosition.right + window.scrollX
            }
            top={domElPosition.bottom - height - animationSettings.animationBottom + window.scrollY}
            height={height}
            animationDirection={animationDirection}
        />,
        pestsNode,
    );
}
