/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject } from 'react';
import styled, { keyframes, css } from 'styled-components';
import SVGMouse from './SVGMouse';
import { Mouse } from './classMouse';
import { MouseProps, defaultMouseProps, AnimationCount } from './mouseUtils';
import { getPxStringIfExists } from '../utils/animation';

type Props = MouseProps & {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    animationDuration?: number;
    animationDelay?: number;
    animationCount?: AnimationCount;
    outerPosition?: 'absolute' | 'fixed';
    ref?: RefObject<HTMLDivElement>;
    onAnimationEnd?: () => void;
};
const keyFramesInOut = (width: number, isTurnedLeft: boolean) => keyframes`
    0% {
        left: ${isTurnedLeft ? `${width}px` : undefined};
        right: ${isTurnedLeft ? undefined : `${width}px`};
    }
    10% {
        left: ${isTurnedLeft ? '0px' : undefined};
        right: ${isTurnedLeft ? undefined : '0px'};
    }
    90% {
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
    $outerPosition: string;
}>(
    (props) => css`
        position: ${props.$outerPosition};
        overflow: hidden;
        width: ${props.$width}px;
        height: ${props.$height}px;
        left: ${getPxStringIfExists(props.$left)};
        right: ${getPxStringIfExists(props.$right)};
        top: ${getPxStringIfExists(props.$top)};
        bottom: ${getPxStringIfExists(props.$bottom)};
    `,
);
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
    outerPosition = 'absolute',
    ref,
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
            ref={ref}
            $width={width}
            $height={height}
            $left={left}
            $right={right}
            $top={top}
            $bottom={bottom}
            $outerPosition={outerPosition}
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
