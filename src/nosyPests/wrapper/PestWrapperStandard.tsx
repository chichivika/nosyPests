/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject } from 'react';
import styled from 'styled-components';
import { Mouse } from '../mouse/classMouse';
import InOutMouse from '../mouse/InOutMouse';
import { defaultGeneralSettings, getNotPortalAnimationPosition } from '../utils/animation';
import { PestWrapperGeneralParam, useDoingAnimation } from './utils';

const StyledPestWrapper = styled.div`
    position: relative;
    height: max-content;
`;

export default function PestWrapperStandard({
    children,
    disabled = false,
    ref,
    animationPause = 20,
    ...generalAnimationSettings
}: PestWrapperGeneralParam) {
    const fullAnimationSettings = {
        ...defaultGeneralSettings,
        ...generalAnimationSettings,
    };
    const {
        height,
        isInside,
        animationBottom,
        animationDirection,
        useNoseAnimation,
        onAnimationEnd,
    } = fullAnimationSettings;

    const width = Mouse.getWidthByHeight(height);
    const isTurnedLeft = animationDirection === 'left';

    const [doingAnimation, setDoingAnimation] = useDoingAnimation(animationPause, disabled);
    const needShowPest = !disabled && doingAnimation;

    const position = getNotPortalAnimationPosition({
        isTurnedLeft,
        isInside,
        width,
        animationBottom,
    });

    return (
        <StyledPestWrapper ref={ref as RefObject<HTMLDivElement>}>
            {children}
            {needShowPest && (
                <InOutMouse
                    {...position}
                    height={height}
                    useNoseAnimation={useNoseAnimation}
                    animationDirection={animationDirection}
                    animationDuration={fullAnimationSettings.animationDuration}
                    animationDelay={fullAnimationSettings.animationDelay}
                    onAnimationEnd={() => {
                        setDoingAnimation(false);
                        onAnimationEnd?.();
                    }}
                />
            )}
        </StyledPestWrapper>
    );
}
