import React, { useEffect, ReactElement, useImperativeHandle, useRef, RefObject } from 'react';
import styled from 'styled-components';
import { pestsRegistrar } from './registrar';
import { UserGeneralAnimationParam } from '../utils/types';

type Props = UserGeneralAnimationParam & {
    children: ReactElement;
    disablePortal?: boolean;
    ref?: RefObject<HTMLElement | null>;
};

const StyledWrapper = styled.div`
    position: relative;
`;

export default function AnimationRegistrar({
    children,
    ref,
    disablePortal = false,
    ...animationSettings
}: Props) {
    const Child = React.Children.only(children);
    const targetRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => {
        return disablePortal ? containerRef.current : targetRef.current;
    }, [disablePortal]);

    useEffect(() => {
        if (targetRef.current === null || (disablePortal && containerRef.current === null)) {
            return;
        }
        const animationKey = pestsRegistrar.registerNodeAnimation({
            ...animationSettings,
            targetEl: targetRef.current,
            containerEl: containerRef.current,
        });

        return () => {
            pestsRegistrar.unregisterNodeAnimation(animationKey);
        };
    });

    if (!disablePortal) {
        return React.cloneElement(Child, { ref: targetRef });
    }

    return (
        <StyledWrapper ref={containerRef}>
            {React.cloneElement(Child, { ref: targetRef })}
        </StyledWrapper>
    );
}
