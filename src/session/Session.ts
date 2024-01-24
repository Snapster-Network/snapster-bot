import { ISession } from "../types/session";

class Session implements ISession {
    private currentScene: string;
    private isEnterStep: boolean;

    constructor(currentScene: string = '') {
        this.currentScene = currentScene;
        this.isEnterStep = true;
    }

    getCurrentScene(): string {
        return this.currentScene
    }

    setCurrentScene(scene: string): void {
        this.currentScene = scene;
        this.setIsEnterStep(true)
    }

    getIsEnterStep(): boolean {
        return this.isEnterStep
    }

    setIsEnterStep(isEnterVal: boolean) {
        this.isEnterStep = isEnterVal
    }
}

export default Session