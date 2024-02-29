import axios from "axios";
import { SNAPSTER_API_URL } from "../config";
import { IGetMeAnswer } from "../types/message";

/**
 * Async request to Snapster API to get bot information by bot token.
 * @param {string} token - Unique bot token.
 * @returns {Promise<string | "internet_error" | IGetMeAnswer>} - Return "internet_error" if internet error, 'false' if request error, IGetMeAnswer if successful response.
 */
export async function getMe(token: string): Promise<"internet_error" | false | IGetMeAnswer> {
    try {
        const serverRes = await axios.get(`${SNAPSTER_API_URL}/v1/botApi/getMe`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (serverRes.data.code != 200) {
            console.error(serverRes.data)
            return false
        }

        const dataRes: IGetMeAnswer = serverRes.data.data
        return dataRes
    } catch (err) {
        console.error(err)
        return "internet_error"
    }
}