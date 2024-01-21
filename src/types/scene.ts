import { IBotContext } from "./context";

interface IScenesGeneratorFunction {
    enter: Function;
    text: Function;
    message: Function;
}

interface IScenesGenerator {
    [methodName: string]: IScenesGeneratorFunction
}

interface IScene {
    name: string;
    enterHandler: Function | undefined;
    textHandler: Function | undefined;
    messageHandler: Function | undefined;
    isEnter: boolean

    getName: () => void;
    onEnter: (handler: (ctx: any) => void) => void;
    onText: (handler: (ctx: any) => void) => void;
    onMessage: (handler: (ctx: any) => void) => void;
    handleAction(action: string, ctx: IBotContext): void;
    getIsEnter(): boolean;
    setIsEnter(isEnter: boolean): void;
}

interface ISceneContext {
    getName: () => string | undefined;
    enter: (scene: string) => void;
    reenter: () => void;
}

export { IScenesGenerator, IScene, ISceneContext }