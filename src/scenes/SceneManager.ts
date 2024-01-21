import { ICtx } from "../types/context";
import { EMessageTypes } from "../utils/enums";
import { Scene } from "./Scene";

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

    notifyObservers() {
        for (const observer of this.observers) {
            observer(this);
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

    sceneEnter(sceneName: string) {
        if (!this.scenesArray) return false
        else if (!Object.keys(this.scenesArray).includes(sceneName)) return false
        this.currentScene = sceneName
        this.notifyObservers();
        return true
    }

    sceneReenter() {
        const currentScene = this.getCurrentSceneName()
        if (!currentScene) return false
        this.notifyObservers();
        return this.sceneEnter(currentScene)
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

    handleUserRequest(ctx: ICtx, action: EMessageTypes): boolean {
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