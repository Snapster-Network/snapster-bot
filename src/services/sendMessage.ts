import axios from "axios";
import { SNAPSTER_API_URL } from "../config";
import { IMessageAddInfoToUser } from "../types/message";
import { EKeyboardType } from "../utils/enums";
import { createInlineKeyboard, createReplyKeyboard } from "../utils/keyboardWorker";

/**
 * Sends a message to a specific chat using the bot.
 * @param {string} token - The authentication token for the bot.
 * @param {string} chat_id - The ID of the chat to send the message to.
 * @param {string} text - The text of the message to be sent.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the message is successfully sent, otherwise `false`.
 */
export const sendMessage = async (token: string, chat_id: string, text: string, addInfo?: IMessageAddInfoToUser): Promise<boolean> => {
    let newKb: any = addInfo?.keyboard
    if (addInfo?.keyboard?.type == EKeyboardType.reply) newKb.keyboard = createReplyKeyboard(addInfo.keyboard.keyboard)
    else if (addInfo?.keyboard?.type == EKeyboardType.inline) newKb.keyboard = createInlineKeyboard(addInfo.keyboard.keyboard)
    else newKb = undefined

    const messageObject = {
        chat_id,
        text,
        silentMode: addInfo?.silentMode,
        protectContent: addInfo?.protectContent,
        stylingType: addInfo?.stylingType,
        keyboard: newKb
    }

    try {
        const res = await axios.post(`${SNAPSTER_API_URL}/v1/botApi/sendMessage`,
            messageObject,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (res.data.code != 200) {
            console.error(res.data)
            return false
        }

        return true;
    } catch (error) {
        console.error(`Error sending message: ${error}`);
        return false;
    }
};