import SceneManager from "../scenes/SceneManager";
import SessionManager from "../session/SessionManager";
import { EActionTypes } from "../utils/enums";
import { ICtx } from "./context";

interface IScenesGeneratorFunction {
    enter(ctx: ICtx): void;
    text(ctx: ICtx): void;
    message(ctx: ICtx): void;
}

interface IScenesGenerator {
    [methodName: string]: IScenesGeneratorFunction
}

interface IScene {
    getName: () => void;
    onEnter: (handler: (ctx: ICtx) => void) => void;
    onText: (handler: (ctx: ICtx) => void) => void;
    onMessage: (handler: (ctx: ICtx) => void) => void;
    handleAction: (ctx: ICtx, action: EActionTypes) => void;
}

interface ISceneContext {
    name: string | undefined;
    enter: (scene: string) => void;
    reenter: () => void;
}


type ISceneManagerObserver = (ctx: ICtx, sceneManager: SceneManager, sessionManager: SessionManager) => void;

export { IScenesGenerator, IScene, ISceneContext, ISceneManagerObserver }