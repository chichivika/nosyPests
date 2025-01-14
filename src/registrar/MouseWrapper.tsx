/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Mouse } from '../mouse/classMouse';
import { MouseProps, defaultMouseProps } from '../mouse/mouseUtils';
import InOutMouse from './InOutMouse';

type Props = MouseProps & {
    disabled?: boolean;
    children: ReactElement;
    bottom?: number;
    animationPause?: number;
    animationDuration?: number;
    animationDelay?: number;
};
const StyledMouseWrapper = styled.div`
    position: relative;
`;

export default function MouseWrapper({
    children,
    bottom = 0,
    animationPause = 20,
    disabled = false,
    ...inOutProps
}: Props) {
    const { height, animationDirection, ...restInOutProps } = {
        ...defaultMouseProps,
        ...inOutProps,
    };

    const width = Mouse.getWidthByHeight(height);
    const isTurnedLeft = animationDirection === 'left';

    const [doingAnimation, setDoingAnimation] = useState<boolean>(true);
    const prevDoingAnimation = useRef<boolean>(true);

    useEffect(() => {
        if (prevDoingAnimation.current === true && doingAnimation === false) {
            prevDoingAnimation.current = doingAnimation;
            if (animationPause <= 0) {
                return;
            }
            const timerId = setTimeout(() => {
                setDoingAnimation(true);
            }, animationPause * 1000);

            return () => {
                if (timerId) {
                    clearTimeout(timerId);
                }
            };
        }
        if (doingAnimation !== prevDoingAnimation.current) {
            prevDoingAnimation.current = doingAnimation;
        }
    }, [doingAnimation, animationPause]);

    const needShowMouse = !disabled && doingAnimation;
    return (
        <StyledMouseWrapper>
            {children}
            {needShowMouse && (
                <InOutMouse
                    left={isTurnedLeft ? -width : undefined}
                    right={isTurnedLeft ? undefined : -width}
                    bottom={bottom}
                    height={height}
                    animationDirection={animationDirection}
                    onAnimationEnd={() => {
                        setDoingAnimation(false);
                    }}
                    {...restInOutProps}
                />
            )}
        </StyledMouseWrapper>
    );
}
