/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import SVGMouse from '../mouse/SVGMouse';
import { Mouse } from '../mouse/classMouse';
import { MouseProps, defaultMouseProps, AnimationCount } from '../mouse/mouseUtils';

type Props = MouseProps & {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    animationDuration?: number;
    animationDelay?: number;
    animationCount?: AnimationCount;
    onAnimationEnd?: () => void;
};
const keyFramesInOut = (width: number, isTurnedLeft: boolean) => keyframes`
    0% {
        left: ${isTurnedLeft ? `${width}px` : undefined};
        right: ${isTurnedLeft ? undefined : `${width}px`};
    }
    15% {
        left: ${isTurnedLeft ? '0px' : undefined};
        right: ${isTurnedLeft ? undefined : '0px'};
    }
    75% {
        left: ${isTurnedLeft ? '0px' : undefined};
        right: ${isTurnedLeft ? undefined : '0px'};
    }
    100% {
        left: ${isTurnedLeft ? `${width}px` : undefined};
        right: ${isTurnedLeft ? undefined : `${width}px`};
    }
`;
const StyledFixedMouseCnt = styled.div<{
    $width: number;
    $height: number;
    $left?: number;
    $right?: number;
    $top?: number;
    $bottom?: number;
}>(
    (props) => css`
        position: absolute;
        overflow: hidden;
        width: ${props.$width}px;
        height: ${props.$height}px;
        left: ${getPxStringIfExists(props.$left)};
        right: ${getPxStringIfExists(props.$right)};
        top: ${getPxStringIfExists(props.$top)};
        bottom: ${getPxStringIfExists(props.$bottom)};
    `,
);
function getPxStringIfExists(number?: number): string | undefined {
    return typeof number === 'number' ? `${number}px` : undefined;
}
const getAnimationRule = ({
    width,
    isTurnedLeft,
    animationDuration,
    animationCount,
}: {
    width: number;
    isTurnedLeft: boolean;
    animationDuration: number;
    animationCount: AnimationCount;
}) => css`
    ${keyFramesInOut(width, isTurnedLeft)} ${animationDuration}s linear ${animationCount};
`;
const StyledMovedMouseCnt = styled.div<{
    $width: number;
    $isTurnedLeft: boolean;
    $animationDuration: number;
    $animationDelay: number;
    $animationCount: AnimationCount;
}>(
    (props) => css`
        position: relative;
        left: ${props.$isTurnedLeft ? `${props.$width}px` : undefined};
        right: ${props.$isTurnedLeft ? undefined : `${props.$width}px`};
        animation: ${getAnimationRule({
            width: props.$width,
            isTurnedLeft: props.$isTurnedLeft,
            animationDuration: props.$animationDuration,
            animationCount: props.$animationCount,
        })};
        animation-delay: ${props.$animationDelay}s;
    `,
);
export default function InOutMouse({
    left,
    right,
    top,
    bottom,
    animationDuration = 6,
    animationDelay = 0,
    animationCount = 1,
    onAnimationEnd,
    ...mouseProps
}: Props) {
    const { height, animationDirection, className, ...restMouseProps } = {
        ...defaultMouseProps,
        ...mouseProps,
    };

    const width = Mouse.getWidthByHeight(height);
    const isTurnedLeft = animationDirection === 'left';

    return (
        <StyledFixedMouseCnt
            $width={width}
            $height={height}
            $left={left}
            $right={right}
            $top={top}
            $bottom={bottom}
        >
            <StyledMovedMouseCnt
                $width={width}
                $isTurnedLeft={isTurnedLeft}
                $animationDuration={animationDuration}
                $animationDelay={animationDelay}
                $animationCount={animationCount}
                onAnimationEnd={() => {
                    onAnimationEnd?.();
                }}
            >
                <SVGMouse
                    height={height}
                    animationDirection={animationDirection}
                    {...restMouseProps}
                />
            </StyledMovedMouseCnt>
        </StyledFixedMouseCnt>
    );
}
