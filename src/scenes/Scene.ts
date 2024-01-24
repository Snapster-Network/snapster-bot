import { ICtx } from "../types/context";
import { IScene } from "../types/scene";
import { EActionTypes } from "../utils/enums";

class Scene implements IScene {
    private name: string;
    private enterHandler: (ctx: ICtx) => void;
    private textHandler: (ctx: ICtx) => void;
    private messageHandler: (ctx: ICtx) => void;

    constructor(name: string) {
        this.name = name;
        this.enterHandler = () => { }
        this.textHandler = () => { }
        this.messageHandler = () => { }
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

    handleAction(ctx: ICtx, action: EActionTypes) {
        if (action == EActionTypes.enter) this.enterHandler(ctx)
        else if (action == EActionTypes.text) this.textHandler(ctx)
        else if (action == EActionTypes.message) this.messageHandler(ctx)
    }
}

export default Scene