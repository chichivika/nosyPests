/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
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
    disabled = false,
    ...inOutProps
}: Props) {
    const { height, animationDirection, ...restInOutProps } = {
        ...defaultMouseProps,
        ...inOutProps,
    };

    const width = Mouse.getWidthByHeight(height);
    const isTurnedLeft = animationDirection === 'left';

    return (
        <StyledMouseWrapper>
            {children}
            {!disabled && (
                <InOutMouse
                    left={isTurnedLeft ? -width : undefined}
                    right={isTurnedLeft ? undefined : -width}
                    bottom={bottom}
                    height={height}
                    animationDirection={animationDirection}
                    {...restInOutProps}
                />
            )}
        </StyledMouseWrapper>
    );
}
