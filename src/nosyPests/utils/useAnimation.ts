import { getPortalAnimationPosition, getPxStringIfExists } from './animation';
import { AnimationDirection } from './types';

export function updateMovedElByTarget({
    movedDomEl,
    targetDomEl,
    animationDirection,
    isInside,
    width,
    height,
    animationBottom,
}: {
    movedDomEl: HTMLElement;
    targetDomEl: HTMLElement;
    isInside: boolean;
    width: number;
    height: number;
    animationBottom: number;
    animationDirection: AnimationDirection;
}) {
    const domElRect = targetDomEl.getBoundingClientRect();
    const position = getPortalAnimationPosition({
        domElRect,
        width,
        height,
        animationBottom,
        animationDirection,
        isInside,
    });

    movedDomEl.style.left = getPxStringIfExists(position.left, '') as string;
    movedDomEl.style.right = getPxStringIfExists(position.right, '') as string;
    movedDomEl.style.top = getPxStringIfExists(position.top, '') as string;
    movedDomEl.style.bottom = getPxStringIfExists(position.bottom, '') as string;
}

export function updatePositionAfterWindowResize({
    movedDomEl,
    targetDomEl,
    animationDirection,
    isInside,
    width,
    height,
    animationBottom,
}: {
    movedDomEl: HTMLElement;
    targetDomEl: HTMLElement;
    isInside: boolean;
    width: number;
    height: number;
    animationBottom: number;
    animationDirection: AnimationDirection;
}) {
    const onResize = () => {
        updateMovedElByTarget({
            movedDomEl,
            targetDomEl,
            animationDirection,
            isInside,
            width,
            height,
            animationBottom,
        });
    };

    window.addEventListener('resize', onResize);

    return () => {
        window.removeEventListener('resize', onResize);
    };
}

export function updatePositionAfterParentScroll({
    movedDomEl,
    targetDomEl,
    animationDirection,
    isInside,
    width,
    height,
    animationBottom,
}: {
    movedDomEl: HTMLElement;
    targetDomEl: HTMLElement;
    isInside: boolean;
    width: number;
    height: number;
    animationBottom: number;
    animationDirection: AnimationDirection;
}) {
    const onResize = () => {
        updateMovedElByTarget({
            movedDomEl,
            targetDomEl,
            animationDirection,
            isInside,
            width,
            height,
            animationBottom,
        });
    };
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
    addScrollEventListener(targetDomEl);

    return () => {
        clearScrollEventListener(targetDomEl);
    };
}
