import { ExistedPropsObject } from '../utils/typeUtils';
import { MouseProps, defaultMouseProps } from '../mouse/mouseUtils';

// ================== types ==============================

export type UserAnimationSettings = MouseProps & {
    animationBottom?: number;
    animationDuration?: number;
    animationDelay?: number;
    isInside?: boolean;
};
export type AnimationSettings = ExistedPropsObject<UserAnimationSettings>;

export type UserRegisteredObject = UserAnimationSettings & {
    domEl: HTMLElement;
};
export type RegisteredObject = ExistedPropsObject<UserRegisteredObject> & {
    key: string;
};
type RegisteredData = RegisteredObject[];

type ShowingObject = {
    key: string;
};
type ShowingData = ShowingObject[];

// ==================== class ====================================

class Registrar {
    private static readonly defaultAnimationValues: UserAnimationSettings = {
        animationBottom: 0,
        animationDuration: 5,
        animationDelay: 0,
    };

    private currentKeyNumber: number = 0;

    public registeredData: RegisteredData = [];

    public showingData: ShowingData = [];

    public pestsDomContainer: HTMLDivElement;

    constructor() {
        const pestsCnt = document.createElement('div');
        pestsCnt.dataset.name = 'nosy-pests-global-container';
        document.body.append(pestsCnt);
        this.pestsDomContainer = pestsCnt;
    }

    public registerNodeAnimation(param: UserRegisteredObject): string {
        const key = this.getNextKey();
        this.registeredData.push({
            ...Registrar.defaultAnimationValues,
            ...defaultMouseProps,
            ...param,
            key,
        } as RegisteredObject);

        return key;
    }

    public unregisterNodeAnimation(key: string) {
        this.registeredData = this.registeredData.filter((registeredObject) => {
            return registeredObject.key !== key;
        });
        this.setObjectIsNotShowing(key);
    }

    public getRandomAnimationObject(): RegisteredObject | null {
        const notSowingObjects = this.getNotShowingObjects();
        if (notSowingObjects.length === 0) {
            return null;
        }

        const randomIndex = Registrar.getRandomIndexFromTo(0, notSowingObjects.length);
        const objectToShow = notSowingObjects[randomIndex];
        this.showingData.push({ key: objectToShow.key });

        return objectToShow;
    }

    public setObjectIsNotShowing(key: string) {
        this.showingData = this.showingData.filter((showedObject) => {
            return showedObject.key !== key;
        });
    }

    public getDomElByKey(key: string): HTMLElement | null {
        const registeredObject = this.registeredData.find((data) => data.key === key);
        return registeredObject?.domEl || null;
    }

    public getAnimationSettingsByKey(animationKey: string): AnimationSettings | null {
        const registeredObject = this.registeredData.find((data) => data.key === animationKey);
        if (!registeredObject) {
            return null;
        }
        const { domEl, key, ...animationSettings } = registeredObject;
        return animationSettings;
    }

    // ================== private ===================================

    private static getRandomIndexFromTo(start: number, end: number) {
        const randomRest = Math.random();
        const randomNumber = randomRest * (end - start) + start;
        return Math.floor(randomNumber);
    }

    private getNotShowingObjects() {
        const { registeredData } = this;
        return registeredData.filter((registeredObject) => {
            const isShowed = this.checkIsShowedByKey(registeredObject.key);
            return !isShowed;
        });
    }

    private checkIsShowedByKey(key: string) {
        const { showingData } = this;
        return showingData.find((showedObject) => {
            return showedObject.key === key;
        });
    }

    private getNextKey() {
        this.currentKeyNumber += 1;
        return `key_${this.currentKeyNumber}`;
    }
}

export const pestsRegistrar = new Registrar();
