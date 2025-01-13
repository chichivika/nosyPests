export type ExistedPropsObject<ObjectType> = {
    [prop in keyof ObjectType]-?: ObjectType[prop];
};
