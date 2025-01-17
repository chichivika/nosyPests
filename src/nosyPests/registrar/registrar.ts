import { ExistedPropsObject, UserGeneralAnimationParam } from '../utils/types';
import { defaultGeneralSettings, getRandomIndexFromTo } from '../utils/animation';

// ================== types ==============================

export type UserRegisteredParam = UserGeneralAnimationParam & {
    targetEl: HTMLElement;
    containerEl: HTMLDivElement | null;
};
export type RegisteredObject = ExistedPropsObject<UserRegisteredParam> & {
    key: string;
    disablePortal: boolean;
};
type RegisteredData = RegisteredObject[];

type ShowingObject = {
    key: string;
};
type ShowingData = ShowingObject[];

// ==================== class ====================================

class Registrar {
    private currentKeyNumber: number = 0;

    public registeredData: RegisteredData = [];

    public showingData: ShowingData = [];

    public registerNodeAnimation(param: UserRegisteredParam): string {
        const key = this.getNextKey();
        this.registeredData.push({
            ...defaultGeneralSettings,
            ...param,
            key,
            disablePortal: param.containerEl !== null,
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

        const randomIndex = getRandomIndexFromTo(0, notSowingObjects.length);
        const objectToShow = notSowingObjects[randomIndex];
        this.showingData.push({ key: objectToShow.key });

        return objectToShow;
    }

    public setObjectIsNotShowing(key: string) {
        this.showingData = this.showingData.filter((showedObject) => {
            return showedObject.key !== key;
        });
    }

    public getRegisteredObjectByKey(key: string): RegisteredObject | null {
        const registeredObject = this.registeredData.find((data) => data.key === key);
        return registeredObject || null;
    }

    // ================== private ===================================

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
