import { GeneralAnimationSettings, DomElPosition, DomElRect, AnimationDirection } from './types';
import { MouseColorType } from '../mouse/mouseUtils';

export const defaultGeneralSettings: GeneralAnimationSettings = {
    animationDirection: 'left',
    animationBottom: 0,
    animationDuration: 5,
    animationDelay: 0,
    height: 30,
    useNoseAnimation: true,
    isInside: false,
    colorType: 'gamma',
};

export function getRandomColorType(): MouseColorType {
    const index = getRandomIndexFromTo(0, 3);
    return ['alpha', 'beta', 'gamma'][index] as MouseColorType;
}

export function getRandomIndexFromTo(start: number, end: number) {
    const randomRest = Math.random();
    const randomNumber = randomRest * (end - start) + start;
    return Math.floor(randomNumber);
}

export function getPxStringIfExists(number?: number, defaultValue?: string): string | undefined {
    const returnDefaultValue = typeof defaultValue === 'string' ? defaultValue : undefined;
    return typeof number === 'number' ? `${number}px` : returnDefaultValue;
}

export function getNotPortalAnimationPosition({
    isTurnedLeft,
    isInside,
    width,
    animationBottom,
}: {
    isTurnedLeft: boolean;
    isInside: boolean;
    width: number;
    animationBottom: number;
}): DomElPosition {
    if (!isInside) {
        return {
            left: isTurnedLeft ? -width : undefined,
            right: isTurnedLeft ? undefined : -width,
            bottom: animationBottom,
        };
    }
    return {
        left: isTurnedLeft ? undefined : 0,
        right: isTurnedLeft ? 0 : undefined,
        bottom: animationBottom,
    };
}

export function getPortalAnimationPosition({
    domElRect,
    width,
    height,
    animationBottom,
    animationDirection,
    isInside,
}: {
    domElRect: DomElRect;
    width: number;
    height: number;
    animationBottom: number;
    animationDirection: AnimationDirection;
    isInside: boolean;
}): DomElPosition {
    return {
        top: domElRect.bottom - height - animationBottom + window.scrollY,
        left: getPortalLeftBySettings({
            domElLeft: domElRect.left,
            domElRight: domElRect.right,
            width,
            animationDirection,
            isInside,
        }),
    };
}

function getPortalLeftBySettings({
    domElLeft,
    domElRight,
    width,
    animationDirection,
    isInside,
}: {
    domElLeft: number;
    domElRight: number;
    width: number;
    animationDirection: AnimationDirection;
    isInside: boolean;
}) {
    const isLeft = animationDirection === 'left';

    if (isLeft) {
        return isInside ? domElRight + window.scrollX - width : domElLeft - width + window.scrollX;
    }
    return isInside ? domElLeft + window.scrollX : domElRight + window.scrollX;
}
