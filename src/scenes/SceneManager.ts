import { ICtx } from "../types/context";
import { EActionTypes } from "../utils/enums";
import Scene from "./Scene";

class SceneManager {
    private scenesArray: Record<string, Scene>;
    private currentScene: string | undefined;
    private observers: Function[] = [];

    constructor() {
        this.scenesArray = {}
    }

    addObserver(observer: Function) {
        this.observers.push(observer);
    }

    notifyObservers(ctx: ICtx) {
        for (const observer of this.observers) {
            observer(ctx, this);
        }
    }

    addScene(scene: Scene) {
        return this.scenesArray[scene.getName()] = scene;
    }

    setScenesArray(scenes: any) {
        for (const methodName in scenes) {
            const newScene = new Scene(methodName)
            const functionsArr = scenes[methodName]
            newScene.onEnter(functionsArr.enter)
            newScene.onText(functionsArr.text)
            newScene.onMessage(functionsArr.message)
            this.addScene(newScene)
        }
    }

    leaveScene(sceneName: string) {
        const previousScene = this.scenesArray[sceneName]
        if (!previousScene) return false;

        return previousScene.leave()
    }

    async sceneEnter(ctx: ICtx, sceneName: string, oldScene: string | undefined): Promise<boolean> {
        if (!this.scenesArray[sceneName]) return false;
        if (this.currentScene) this.scenesArray[sceneName].handleAction(ctx, EActionTypes.enter);
        if (oldScene) this.leaveScene(oldScene)
        this.currentScene = sceneName;
        this.notifyObservers(ctx);
        return true;
    }

    sceneReenter(ctx: ICtx) {
        const currentScene = this.getCurrentSceneName()
        if (!currentScene) return false
        this.notifyObservers(ctx);
        return this.sceneEnter(ctx, currentScene, currentScene)
    }

    getCurrentScene() {
        if (!this.scenesArray || !this.currentScene) return undefined
        const currentScene = this.scenesArray[this.currentScene]
        return currentScene || undefined
    }

    getCurrentSceneName(): string | undefined {
        return this.currentScene
    }

    isSceneSet() {
        if (!this.currentScene) return false
        return true
    }

    handleUserRequest(ctx: ICtx, action: EActionTypes): boolean {
        try {
            const currentScene: Scene | undefined = this.getCurrentScene();
            if (!currentScene) return false;

            currentScene.handleAction(ctx, action);
            return true;
        } catch (error) {
            console.error(`Scene manager error: ${error}`);
            return false
        }
    }
}

export default SceneManager