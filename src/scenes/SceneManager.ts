import { IBotContext } from "../types/context";
import { EMessageTypes } from "../utils/enums";
import { Scene } from "./Scene";

class SceneManager {
    private scenesArray: Record<string, Scene>;
    private currentScene: string | undefined;

    constructor() {
        this.scenesArray = {}
    }

    addScene(scene: Scene) {
        return this.scenesArray[scene.getName()] = scene;
    }

    // enterScene(sceneName: string, fun: Function) {
    //     const scene = this.scenes[sceneName];
    //     if (scene) {
    //         // this.context.enter(scene)
    //         fun(this.context)
    //     } else {
    //         throw new Error(`Scene "${sceneName}" not found`)
    //     }
    // }

    // leaveScene() {
    //     this.context.leave();
    // }

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

    // setScenesArray(scenes:IScenesGenerator) {
    //     for (const methodName in scenes) {
    //         const scene = scenes[methodName];
    //         const action: ISceneAction = {
    //             enter(handler: (ctx: IBotContext) => Promise<void>): void {
    //               handler("ctx");
    //             },

    //             on(eventType: string, handler: (ctx: IBotContext) => Promise<void>): void {
    //                 handler("ctx");
    //             }
    //           };
    //         scene(action);
    //       }
    // } 

    sceneEnter(sceneName: string) {
        if (!this.scenesArray) return false
        else if (!Object.keys(this.scenesArray).includes(sceneName)) return false
        this.currentScene = sceneName
        return true
    }

    sceneReenter() {
        const currentScene = this.getCurrentSceneName()
        if (!currentScene) return false
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

    // handleUpdate(update: any) {
    //     if (this.context.scene) {
    //         this.context.scene.handleMessage({
    //             ...update,
    //             scene: this.context,
    //             enterScene: this.enterScene.bind(this),
    //             leaveScene: this.leaveScene.bind(this)
    //         });
    //     }
    // }

    handleUserRequest(ctx: IBotContext, action: EMessageTypes): boolean {
        try {
            const currentScene: Scene | undefined = this.getCurrentScene();
            if (!currentScene) return false;

            // const action: ISceneAction = {
            //     enter(handler: (ctx: IBotContext) => Promise<void>): void {
            //         handler(msgObj);
            //     }

            //     on(eventType: string, handler: (ctx: IBotContext) => Promise<void>): void {
            //                 if (eventType == 'text') handler(msgObj);
            //             }
            //         }
            //     };
            // }
            currentScene.handleAction(ctx, action);

            return true;
        } catch (error) {
            console.error(`Scene manager error: ${error}`);
            return false
        }
    }

    // public handleUpdate(update: any) {
    //     // Обробляємо повідомлення
    //     if (update.type === "message") {
    //       const message = update.message;
    //       // Передаємо повідомлення сцені
    //       this.context.scene.onMessage(message);
    //     }
    //   }
}

export default SceneManager 