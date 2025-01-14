import React, { useEffect, ReactElement, useImperativeHandle, useRef, RefObject } from 'react';
import { pestsRegistrar, UserAnimationSettings } from './registrar';

type Props = UserAnimationSettings & {
    children: ReactElement;
    ref?: RefObject<HTMLElement | null>;
};

export default function AnimationRegistrar({ children, ref, ...animationSettings }: Props) {
    const Child = React.Children.only(children);
    const childRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => childRef.current, []);

    useEffect(() => {
        if (childRef.current === null) {
            return;
        }
        const animationKey = pestsRegistrar.registerNodeAnimation({
            ...animationSettings,
            domEl: childRef.current,
        });

        return () => {
            pestsRegistrar.unregisterNodeAnimation(animationKey);
        };
    });

    return React.cloneElement(Child, { ref: childRef });
}
