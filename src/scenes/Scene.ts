import { IBotContext } from "../types/context";
import { EMessageTypes } from "../utils/enums";

class Scene {
    private name: string;
    private enterHandler: Function | undefined;
    private textHandler: Function | undefined;
    private messageHandler: Function | undefined;
    private isEnter: boolean = true

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    onEnter(handler: Function) {
        this.enterHandler = handler
    }

    onText(handler: Function) {
        this.textHandler = handler
    }

    onMessage(handler: Function) {
        this.messageHandler = handler
    }

    handleAction(ctx: IBotContext, action: EMessageTypes) {
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

export { Scene }