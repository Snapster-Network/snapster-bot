import { ICtx } from "../types/context";
import { IScene } from "../types/scene";
import { EMessageTypes } from "../utils/enums";

class Scene implements IScene {
    private name: string;
    private enterHandler: ((ctx: ICtx) => void) | undefined;
    private textHandler: ((ctx: ICtx) => void) | undefined;
    private messageHandler: ((ctx: ICtx) => void) | undefined;
    private isEnter: boolean = true

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    onEnter(handler: (ctx: ICtx) => void) {
        this.enterHandler = handler
    }

    onText(handler: (ctx: ICtx) => void) {
        this.textHandler = handler
    }

    onMessage(handler: (ctx: ICtx) => void) {
        this.messageHandler = handler
    }

    handleAction(ctx: ICtx, action: EMessageTypes) {
        if (this.isEnter && this.enterHandler) {
            this.isEnter = false;
            this.enterHandler(ctx)
        }
        else if (action == EMessageTypes.text && this.textHandler) this.textHandler(ctx)
        else if (action == EMessageTypes.message && this.messageHandler) this.messageHandler(ctx)
    }

    getIsEnter() {
        return this.isEnter
    }

    setIsEnter() {
        this.isEnter = false
    }
}

export default Scene 