import { ICtx } from "../types/context";
import { setTextHandler } from "../utils/handlers/textHandler";

/**
 * Sets a handler for a specific text.
 * @param {string} text - The text to listen for.
 * @param {Function} customHandler - The custom handler function to be executed when the text is received.
 * @returns {boolean} Returns `true` if the handler is successfully set, or `false` if there is an error or if the text is too long.
 */
export const hearMessage = (text: string, customHandler: (ctx: ICtx) => void) => {
    try {
        if (text.length > 4096) return false;

        return setTextHandler(text, customHandler);
    } catch (error) {
        console.error(`Error in hearMessage: ${error}`);
        return false;
    }
};