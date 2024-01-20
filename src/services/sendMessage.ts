import axios from "axios";
import { SNAPSTER_API_URL } from "../config";

/**
 * Sends a message to a specific chat using the bot.
 * @param {string} token - The authentication token for the bot.
 * @param {string} chat_id - The ID of the chat to send the message to.
 * @param {string} text - The text of the message to be sent.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the message is successfully sent, otherwise `false`.
 */
export const sendMessage = async (token: string, chat_id: string, text: string): Promise<boolean> => {
    try {
        const res = await axios.post(`${SNAPSTER_API_URL}/v1/bot/sendMessage`,
            {
                chat_id,
                text
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.data.code === 200;
    } catch (error) {
        console.error(`Error sending message: ${error}`);
        return false;
    }
};