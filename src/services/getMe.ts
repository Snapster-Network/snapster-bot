import axios from "axios";
import { SNAPSTER_API_URL } from "../config";
import { IGetMeAnswer } from "../types/message";

export async function getMe(token: string) {
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