import { IGetMeAnswer, IMessageAddInfoToUser, IUserMessageToBot } from "./message"
import { ISceneContext } from "./scene"
import { ISessionContext } from "./session"

interface IBot extends IGetMeAnswer {
    token: string,
}

interface ICtx {
    bot: IBot,
    message: IUserMessageToBot,
    scene: ISceneContext,
    session: ISessionContext
    reply: (text: string, addInfo?: IMessageAddInfoToUser) => void
}

export { IBot, ICtx }