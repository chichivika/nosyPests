/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import SVGMouse from '../mouse/SVGMouse';
import { Mouse } from '../mouse/classMouse';
import { MouseProps, defaultMouseProps } from '../mouse/mouseUtils';

type Props = MouseProps & {
    children: ReactElement;
    bottom?: number;
    animationPause?: number;
    animationDuration?: number;
    animationDelay?: number;
    disabled?: boolean;
};
const StyledMouseWrapper = styled.div`
    position: relative;
`;
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
    $bottom: number;
    $width: number;
    $height: number;
    $isTurnedLeft: boolean;
}>(
    (props) => css`
        position: absolute;
        overflow: hidden;
        width: ${props.$width}px;
        height: ${props.$height}px;
        left: ${props.$isTurnedLeft ? `${-props.$width}px` : undefined};
        right: ${props.$isTurnedLeft ? undefined : `${-props.$width}px`};
        bottom: ${props.$bottom}px;
    `,
);
const getAnimationRule = (width: number, isTurnedLeft: boolean, animationDuration: number) => css`
    ${keyFramesInOut(width, isTurnedLeft)} ${animationDuration}s linear 1;
`;
const StyledMovedMouseCnt = styled.div<{
    $width: number;
    $isTurnedLeft: boolean;
    $animationDuration: number;
    $animationDelay: number;
}>(
    (props) => css`
        position: relative;
        left: ${props.$isTurnedLeft ? `${props.$width}px` : undefined};
        right: ${props.$isTurnedLeft ? undefined : `${props.$width}px`};
        animation: ${getAnimationRule(props.$width, props.$isTurnedLeft, props.$animationDuration)};
        animation-delay: ${props.$animationDelay}s;
    `,
);
export default function MouseWrapper({
    children,
    bottom = 0,
    animationPause = 20,
    animationDuration = 6,
    animationDelay = 0,
    disabled = false,
    ...mouseProps
}: Props) {
    const { height, animationDirection, className, ...restMouseProps } = {
        ...defaultMouseProps,
        ...mouseProps,
    };
    const [showMouse, setShowMouse] = useState<boolean>(true);
    const prevShowMouse = useRef<boolean>(true);

    useEffect(() => {
        if (prevShowMouse.current === true && showMouse === false) {
            prevShowMouse.current = showMouse;
            if (animationPause <= 0) {
                return;
            }
            const timerId = setTimeout(() => {
                setShowMouse(true);
            }, animationPause * 1000);

            return () => {
                if (timerId) {
                    clearTimeout(timerId);
                }
            };
        }
        if (showMouse !== prevShowMouse.current) {
            prevShowMouse.current = showMouse;
        }
    }, [showMouse, animationPause]);

    const width = Mouse.getWidthByHeight(height);
    const isTurnedLeft = animationDirection === 'left';

    const needRenderMouse = showMouse && !disabled;
    return (
        <StyledMouseWrapper>
            {children}
            <StyledFixedMouseCnt
                $width={width}
                $height={height}
                $isTurnedLeft={isTurnedLeft}
                $bottom={bottom}
            >
                {needRenderMouse && (
                    <StyledMovedMouseCnt
                        $width={width}
                        $isTurnedLeft={isTurnedLeft}
                        $animationDuration={animationDuration}
                        $animationDelay={animationDelay}
                        onAnimationEnd={() => {
                            setShowMouse(false);
                        }}
                    >
                        <SVGMouse
                            height={height}
                            animationDirection={animationDirection}
                            {...restMouseProps}
                        />
                    </StyledMovedMouseCnt>
                )}
            </StyledFixedMouseCnt>
        </StyledMouseWrapper>
    );
}
