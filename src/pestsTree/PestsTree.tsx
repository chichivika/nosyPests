import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import PestWrapper from '../nosyPests/wrapper/PestWrapper';

const StyledTarget = styled.div<{ $size: number }>`
    width: 0px;
    height: ${(props) => `${props.$size}px`};
`;
export default function PestsTree({
    flip = false,
    mirror = false,
}: {
    flip?: boolean;
    mirror?: boolean;
}) {
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        if (show) {
            return;
        }
        const timeId = setTimeout(() => {
            setShow(true);
        }, 1000);

        return () => {
            clearTimeout(timeId);
        };
    }, [show]);

    const TargetEl = <StyledTarget $size={190} />;
    if (!show) {
        return TargetEl;
    }

    const heights = [15, 20, 30, 50, 75];

    if (mirror) {
        return renderMirrorTree({
            heights,
            TargetEl,
            onAnimationEnd: () => {
                setShow(false);
            },
        });
    }

    return renderStandardTree({
        heights,
        TargetEl,
        flip,
        onAnimationEnd: () => {
            setShow(false);
        },
    });
}

function renderStandardTree({
    heights,
    TargetEl,
    flip,
    onAnimationEnd,
}: {
    heights: number[];
    TargetEl: ReactElement;
    flip: boolean;
    onAnimationEnd: () => void;
}) {
    let sum = heights.reduce((acc, i) => acc + i, 0);
    let prevWrapper: ReactElement = TargetEl;
    let wrapper: ReactElement = TargetEl;

    heights.forEach((height, i) => {
        sum -= height;
        wrapper = (
            <PestWrapper
                animationDelay={0.5 * (heights.length - i)}
                height={height}
                animationBottom={sum}
                animationPause={3}
                animationDirection={(i % 2 === 0) === flip ? 'right' : 'left'}
                onAnimationEnd={i === 0 ? onAnimationEnd : undefined}
            >
                {prevWrapper}
            </PestWrapper>
        );
        prevWrapper = wrapper;
    });

    return wrapper;
}

function renderMirrorTree({
    heights,
    TargetEl,
    onAnimationEnd,
}: {
    heights: number[];
    TargetEl: ReactElement;
    onAnimationEnd: () => void;
}) {
    let sum = heights.reduce((acc, i) => acc + i, 0);
    let prevWrapper: ReactElement = TargetEl;
    let wrapper: ReactElement = TargetEl;

    heights.forEach((height, i) => {
        sum -= height;
        wrapper = (
            <PestWrapper
                animationDelay={0.5 * (heights.length - i)}
                height={height}
                animationBottom={sum}
                animationPause={3}
                animationDirection='right'
                onAnimationEnd={i === 0 ? onAnimationEnd : undefined}
            >
                <PestWrapper
                    animationDelay={0.5 * (heights.length - i)}
                    height={height}
                    animationBottom={sum}
                    animationPause={3}
                    animationDirection='left'
                >
                    {prevWrapper}
                </PestWrapper>
            </PestWrapper>
        );
        prevWrapper = wrapper;
    });

    return wrapper;
}
