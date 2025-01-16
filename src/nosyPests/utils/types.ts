export type ExistedPropsObject<ObjectType> = {
    [prop in keyof ObjectType]-?: ObjectType[prop];
};

export type DomElPosition = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};
export type DomElRect = ExistedPropsObject<DomElPosition>;

export type AnimationDirection = 'left' | 'right';

export type UserGeneralAnimationParam = {
    animationDirection?: AnimationDirection;
    animationBottom?: number;
    animationDuration?: number;
    animationDelay?: number;
    height?: number;
    useNoseAnimation?: boolean;
    isInside?: boolean;
};
export type GeneralAnimationSettings = ExistedPropsObject<UserGeneralAnimationParam>;
