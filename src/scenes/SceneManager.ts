import SessionManager from "../session/SessionManager";
import { ICtx } from "../types/context";
import { ISceneManagerObserver } from "../types/scene";
import { ISession } from "../types/session";
import { EActionTypes } from "../utils/enums";
import Scene from "./Scene";

class SceneManager {
    private scenesArray: Record<string, Scene>;
    private observers: ISceneManagerObserver[] = [];
    private defaultScene: string | undefined

    constructor() {
        this.scenesArray = {}
    }

    addObserver(observer: ISceneManagerObserver) {
        this.observers.push(observer);
    }

    notifyObservers(ctx: ICtx, sessionManager: SessionManager) {
        for (const observer of this.observers) {
            observer(ctx, this, sessionManager);
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

    // leaveScene(sceneName: string) {
    //     const previousScene = this.scenesArray[sceneName]
    //     if (!previousScene) return false;

    //     return previousScene.leave()
    // }

    async sceneEnter(ctx: ICtx, sceneName: string, sessionManager: SessionManager): Promise<boolean> {
        if (!this.scenesArray[sceneName]) return false;
        this.scenesArray[sceneName].handleAction(ctx, EActionTypes.enter);
        // if (oldScene) this.leaveScene(oldScene)
        // this.currentScene = sceneName;
        const session = sessionManager.getSession(ctx.message.from)
        // if (this.currentScene && !session?.getIsEnterStep()) this.scenesArray[sceneName].handleAction(ctx, EActionTypes.enter);
        session?.setCurrentScene(sceneName)
        session?.setIsEnterStep(false)
        this.notifyObservers(ctx, sessionManager);
        return true;
    }

    setDefaultScene(ctx: ICtx, sceneName: string, sessionManager: SessionManager) {
        if (this.defaultScene) throw new Error(`Scene was set earlier (${this.defaultScene})`);
        else if (!this.scenesArray[sceneName]) throw new Error(`Scene "${sceneName}" not found`);
        this.defaultScene = sceneName
        // this.notifyObservers(ctx, sessionManager);
        ctx
        sessionManager
    }

    getDefaultScene() {
        return this.defaultScene
    }


    sceneReenter(ctx: ICtx, sessionManager: SessionManager) {
        const session = sessionManager.getSession(ctx.message.from)
        if (!session) return
        const sceneName = session.getCurrentScene()
        const currentScene = this.scenesArray[sceneName]
        if (!currentScene) return
        this.scenesArray[sceneName].handleAction(ctx, EActionTypes.enter);
        session.setCurrentScene(sceneName)
        session.setIsEnterStep(false)
        this.notifyObservers(ctx, sessionManager);
    }

    isScenesArraySet() {
        return Object.keys(this.scenesArray).length != 0
    }

    getScene(sceneName: string) {
        return this.scenesArray[sceneName]
    }

    handleUserRequest(ctx: ICtx, serverAction: EActionTypes, userSession: ISession): boolean {
        try {
            const currentScene: Scene = this.getScene(userSession.getCurrentScene())
            if (!currentScene) return false;

            let action = serverAction
            if (userSession.getIsEnterStep()) {
                action = EActionTypes.enter
                userSession.setIsEnterStep(false)
            } else action = serverAction

            currentScene.handleAction(ctx, action);
            return true;
        } catch (error) {
            console.error(`Scene manager error: ${error}`);
            return false
        }
    }
}

export default SceneManager