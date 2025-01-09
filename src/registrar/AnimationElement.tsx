import React, { useState, useEffect } from 'react';
import { getRandomAnimationObject, AnimationSettings } from './registrarUtils';
import SVGMouse from '../mouse/SVGMouse';
import { Mouse } from '../mouse/mouseUtils';

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
            const registeredObject = getRandomAnimationObject();
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
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [animationPeriodicity, disabled]);

    if (disabled || animationSettings === null || domElPosition === null) {
        return null;
    }

    if (animationSettings.animationName !== 'mouse') {
        return null;
    }

    const isTurnedLeft = animationSettings.animationDirection === 'left';
    const height = animationSettings.animationHeight;
    const width = Mouse.getWidthByHeight(height);
    return (
        <div
            style={{
                position: 'absolute',
                left: isTurnedLeft ? `${domElPosition.left - width}px` : `${domElPosition.right}px`,
                top: `${domElPosition.bottom - height - animationSettings.animationBottom}px`,
                height: `${height}px`,
                width: `${width}px`,
            }}
        >
            <SVGMouse turnedLeft={isTurnedLeft} height={height} translateDuration={5} />
        </div>
    );
}
