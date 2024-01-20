import { IUserMessageToBot } from "../types/message";
import { longPollingRequest } from "../utils/longPollingRequest";
import { checkTextHandler } from "../utils/handlers/textHandler";
import { checkCommandHandler } from "../utils/handlers/commandHandler";
import SceneManager from "../scenes/SceneManager";
import { IBotContext } from "../types/context";
import { EMessageTypes } from "../utils/enums";

/**
 * Constantly requests updates from the Snapster server via long polling.
 * 
 * @param {string} token - Token for authentication on the Snapster server.
 * @param {number} timeout - Timeout for long polling request.
 * @returns {Promise<boolean>} A promise that returns false if the server returns a status other than 200.
 * 
 * The function makes requests to the server through the `longPollingRequest` function. Upon receiving a response,
 * the function processes the message using the `checkTextHandler` or `checkCommandHandler` depending on the state of `botVariables`.
 * In case of errors or server unavailability, the function will try to retry the request after a short pause.
 * If the number of errors exceeds the allowed maximum (`maxErrors`), the function will make a longer pause (`pauseDuration`) before the next attempt.
 */

export const getUpdates = async (ctx: IBotContext, timeout: number, sceneManager: SceneManager) => {
    let errorCount = 0;
    const maxErrors = 10;
    const pauseDuration = 15 * 60 * 1000;

    while (true) {
        try {
            const serverRes = await longPollingRequest(ctx.bot.token, timeout);
            if (!serverRes) throw new Error('Snapster server not working')
            else if (serverRes.code != 200) return false;

            const msgObj: IUserMessageToBot = {
                date: serverRes.data.message.date,
                chat: serverRes.data.message.chat,
                message_id: serverRes.data.message.message_id,
                from: serverRes.data.message.from,
                text: serverRes.data.message.text

                // chat: String(serverRes.data.message.chat) || "",
                // message_id: String(serverRes.data.message.message_id) || "",
                // from: String(serverRes.data.message.from) || "",
                // text: String(serverRes.data.message.text) || ""
            };

            ctx.message = msgObj

            checkTextHandler(msgObj);
            checkCommandHandler(msgObj);
            sceneManager.handleUserRequest(ctx, EMessageTypes.text)

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
};