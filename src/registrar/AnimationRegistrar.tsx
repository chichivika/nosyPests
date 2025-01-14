import React, { useRef, useEffect, ReactElement } from 'react';
import { pestsRegistrar, UserAnimationSettings } from './registrar';

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
        pestsRegistrar.registerNodeAnimation({ ...animationSettings, domEl: childRef.current });
    });

    return React.cloneElement(Child, { ref: childRef });
}
