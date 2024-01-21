import { IUserMessageToBot } from "./message"
import { ISceneContext } from "./scene"

interface IBot {
    token: string
}

interface ICtx {
    bot: IBot,
    message: IUserMessageToBot,
    scene?: ISceneContext
}

export { IBot, ICtx }