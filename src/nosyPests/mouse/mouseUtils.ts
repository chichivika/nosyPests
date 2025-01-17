import { ExistedPropsObject } from '../utils/types';

export type AnimationDirection = 'left' | 'right';
export type MouseColorType = 'alpha' | 'beta' | 'gamma';
export type MouseEyeType = 'standard' | 'narrow';

export type MouseProps = {
    height?: number;
    animationDirection?: AnimationDirection;
    useNoseAnimation?: boolean;
    colorType?: MouseColorType;
    className?: string;
};
export type ExistedMouseProps = ExistedPropsObject<MouseProps>;

export const defaultMouseProps: ExistedMouseProps = {
    height: 40,
    animationDirection: 'left',
    useNoseAnimation: true,
    colorType: 'gamma',
    className: '',
};

type SettingByMouseType = {
    eyeType?: MouseEyeType;
    hasNoseSpot?: boolean;
};
export const settingsByMouseType = {
    alpha: {
        eyeType: 'standard',
        hasNoseSpot: true,
    },
    beta: {
        eyeType: 'narrow',
    },
    gamma: {
        eyeType: 'standard',
    },
} as {
    alpha: SettingByMouseType;
    beta: SettingByMouseType;
    gamma: SettingByMouseType;
};

export const colorsByMouseType = {
    alpha: {
        bodyFillColor: '#fffcf4',
        bodyStrokeColor: 'grey',
        noseSpotFillColor: 'lightgrey',
        noseSpotStrokeColor: 'grey',
    },
    beta: {
        bodyFillColor: '#f5dfe2',
        bodyStrokeColor: 'grey',
        noseSpotFillColor: '',
        noseSpotStrokeColor: '',
    },
    gamma: {
        bodyFillColor: 'lightGrey',
        bodyStrokeColor: 'grey',
        noseSpotFillColor: '',
        noseSpotStrokeColor: '',
    },
};

export type AnimationCount = number | 'infinite';
