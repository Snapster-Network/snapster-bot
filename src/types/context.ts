import { IUserMessageToBot } from "./message"
import { ISceneContext } from "./scene"

interface IBot {
    token: string
}

interface IBotContext {
    bot: IBot,
    message?: IUserMessageToBot,
    scene?: ISceneContext
}

export { IBot, IBotContext }