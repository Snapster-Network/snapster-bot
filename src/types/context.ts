import { IGetMeAnswer, IMessageAddInfoToUser, IUserMessageToBot } from "./message"
import { ISceneContext } from "./scene"
import { ISessionContext } from "./session"

/**
 * Interface representing the basic structure of a bot.
 */
interface IBot extends IGetMeAnswer {
    /** Token used for bot authentication. */
    token: string,
}

/**
 * Represents the context of a bot interaction.
 * Includes information about the bot, message, current scene, and session.
 */
interface ICtx {
    /** The bot instance associated with the current context. */
    bot: IBot,

    /** The user message received by the bot. */
    message: IUserMessageToBot,

    /** The current scene context, managing the dialogue flow. */
    scene: ISceneContext,

    /** Session data for the current interaction. */
    session: ISessionContext,

    /**
     * Method to send a reply to the user.
     * @param {string} text - The text of the reply.
     * @param {IMessageAddInfoToUser} [addInfo] - Additional information for the reply (optional).
     */
    reply: (text: string, addInfo?: IMessageAddInfoToUser) => void
}

export { IBot, ICtx }