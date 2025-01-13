import { ExistedPropsObject } from '../utils/typeUtils';

type AnimationName = 'mouse' | 'roach';
type AnimationDirection = 'left' | 'right';

export type UserAnimationSettings = {
    animationName?: AnimationName;
    animationDirection?: AnimationDirection;
    animationHeight?: number;
    animationBottom?: number;
    animationTop?: number;
};
export type AnimationSettings = ExistedPropsObject<UserAnimationSettings>;

export type UserRegisteredObject = UserAnimationSettings & {
    domEl: HTMLElement;
};
type RegisteredObject = ExistedPropsObject<UserRegisteredObject>;
type RegisteredData = RegisteredObject[];

const registeredData: RegisteredData = [];
const defaultAnimationValues: UserAnimationSettings = {
    animationName: 'mouse',
    animationDirection: 'left',
    animationHeight: 40,
    animationBottom: 0,
};

export function registerNodeAnimation(param: UserRegisteredObject) {
    registeredData.push({ ...defaultAnimationValues, ...param } as RegisteredObject);
}

function getRandomIndexFromTo(start: number, end: number) {
    const randomRest = Math.random();
    const randomNumber = randomRest * (end - start) + start;
    return Math.floor(randomNumber);
}
export function getRandomAnimationObject(): RegisteredObject | null {
    if (registeredData.length === 0) {
        return null;
    }
    const randomIndex = getRandomIndexFromTo(0, registeredData.length);
    return registeredData[randomIndex] || null;
}
