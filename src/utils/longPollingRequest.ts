import axios from "axios";
import { SNAPSTER_API_URL } from "../config";

/**
 * Performs a long polling request to the Snapster bot API to get updates.
 * @param {string} token - The authentication token for the bot.
 * @param {number} timeout - The timeout in seconds for the long polling request.
 * @returns {Promise<any>} A promise that resolves to the response data if successful, or `false` in case of an error.
 */
export const longPollingRequest = async (token: string, timeout: number): Promise<any> => {
    try {
        const response = await axios.get(`${SNAPSTER_API_URL}/v1/bot/getUpdates?timeout=${timeout}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error getting updates: ${error}`);
        return false;
    }
};