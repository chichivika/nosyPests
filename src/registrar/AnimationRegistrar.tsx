import React, { useRef, useEffect, ReactElement } from 'react';
import { registerNodeAnimation, UserAnimationSettings } from './registrar';

type Props = UserAnimationSettings & {
    children: ReactElement;
};

export default function AnimationRegistrar({ children, ...animationSettings }: Props) {
    const childRef = useRef(null);
    const Child = React.Children.only(children);

    useEffect(() => {
        if (childRef.current === null) {
            return;
        }
        registerNodeAnimation({ ...animationSettings, domEl: childRef.current });
    });

    return React.cloneElement(Child, { ref: childRef });
}
