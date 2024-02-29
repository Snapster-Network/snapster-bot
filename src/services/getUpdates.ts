import SceneManager from "../scenes/SceneManager";
import SessionManager from "../session/SessionManager";
import { ICtx } from "../types/context";
import { IUserMessageToBot } from "../types/message";
import { EActionTypes } from "../utils/enums";
import { checkCommandHandler } from "../utils/handlers/commandHandler";
import { handleNewMessage } from "../utils/handlers/defaultHandler";
import { checkTextHandler } from "../utils/handlers/textHandler";
import { longPollingRequest } from "../utils/longPollingRequest";
import { sendMessage } from "./sendMessage";

/**
 * Long polling request to the server to receive updates.
 * @param {ICtx} ctx - Context with information about the bot.
 * @param {SessionManager} sessionManager - Information about bot session.
 * @param {SceneManager} sceneManager - Information about bot scenes.
 * @param {number} timeout - Number of seconds of long polling delay.
 */
const getUpdates = async (ctx: ICtx, sessionManager: SessionManager, sceneManager: SceneManager, timeout: number): Promise<void> => {
    let errorCount = 0;
    const maxErrors = 10;
    const pauseDuration = 15 * 60 * 1000;

    while (true) {
        try {
            const serverRes = await longPollingRequest(ctx.bot.token, timeout);
            if (!serverRes) throw new Error('Snapster server not working')
            else if (serverRes.code == 408) continue;
            else if (serverRes.code != 200) throw new Error(`Request error: ${serverRes.message}`)

            const msgObj: IUserMessageToBot = {
                date: serverRes.data.message.date,
                chat: serverRes.data.message.chat,
                message_id: serverRes.data.message.message_id,
                from: serverRes.data.message.from,
                text: serverRes.data.message.text
            };

            const userId = serverRes.data.message.from

            ctx.message = msgObj
            ctx.reply = async (text, addInfo) => {
                return await sendMessage(ctx.bot.token, userId, text, addInfo)
            }

            checkTextHandler(ctx);
            checkCommandHandler(ctx);
            handleNewMessage(ctx)

            const userSession = sessionManager.getSession(userId) || sessionManager.setSession(ctx, sceneManager.getDefaultScene(), sceneManager)
            sceneManager.handleUserRequest(ctx, EActionTypes.text, userSession)

            errorCount = 0;
        } catch (error) {
            console.error(`Error getting updates: ${error}`);
            errorCount++;

            await new Promise(resolve => setTimeout(resolve, 10 * 1000));

            if (errorCount >= maxErrors) {
                console.error(`Too many wrong requests (${errorCount}), pausing for ${pauseDuration / 1000 / 60} minutes.`);
                await new Promise(resolve => setTimeout(resolve, pauseDuration));
                errorCount = 0;
            }
        }
    }
}

export default getUpdates