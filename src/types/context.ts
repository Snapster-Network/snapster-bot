import { IUserMessageToBot } from "./message"

interface IBot {
    token: string
}

interface IBotContext {
    bot: IBot,
    message?: IUserMessageToBot
}

export { IBot, IBotContext }