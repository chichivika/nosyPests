import React, { useEffect, ReactElement, useImperativeHandle, useRef, RefObject } from 'react';
import styled from 'styled-components';
import { pestsRegistrar, UserAnimationSettings } from './registrar';

type Props = UserAnimationSettings & {
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
    const childRef = useRef<HTMLElement>(null);
    const renderCntRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => {
        return disablePortal ? renderCntRef.current : childRef.current;
    }, [disablePortal]);

    useEffect(() => {
        if (childRef.current === null || (disablePortal && renderCntRef.current === null)) {
            return;
        }
        const animationKey = pestsRegistrar.registerNodeAnimation({
            ...animationSettings,
            domEl: childRef.current,
            renderEl: renderCntRef.current,
        });

        return () => {
            pestsRegistrar.unregisterNodeAnimation(animationKey);
        };
    });

    if (!disablePortal) {
        return React.cloneElement(Child, { ref: childRef });
    }

    return (
        <StyledWrapper ref={renderCntRef}>
            {React.cloneElement(Child, { ref: childRef })}
        </StyledWrapper>
    );
}
