import { ExistedPropsObject } from '../utils/typeUtils';

export type AnimationDirection = 'left' | 'right';

export type MouseProps = {
    height?: number;
    animationDirection?: AnimationDirection;
    useNoseAnimation?: boolean;
    className?: string;
};
export type ExistedMouseProps = ExistedPropsObject<MouseProps>;

export const defaultMouseProps: ExistedMouseProps = {
    height: 40,
    animationDirection: 'left',
    useNoseAnimation: true,
    className: '',
};

export type AnimationCount = number | 'infinite';
