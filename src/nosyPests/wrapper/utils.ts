import { ReactElement, useEffect, useRef, useState, RefObject } from 'react';
import { UserGeneralAnimationParam } from '../utils/types';

export type PestWrapperGeneralParam = UserGeneralAnimationParam & {
    children: ReactElement;
    animationPause?: number;
    disabled?: boolean;
    ref?: RefObject<HTMLElement | null>;
};

export function useDoingAnimation(animationPause: number, disabled: boolean) {
    const [doingAnimation, setDoingAnimation] = useState<boolean>(true);
    const prevDoingAnimation = useRef<boolean>(true);

    useEffect(() => {
        if (!disabled && prevDoingAnimation.current === true && doingAnimation === false) {
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
    }, [doingAnimation, animationPause, disabled]);

    return [doingAnimation, setDoingAnimation] as [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>,
    ];
}
