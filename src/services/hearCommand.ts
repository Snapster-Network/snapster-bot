import { ICtx } from "../types/context";
import { setCommandHandler } from "../utils/handlers/commandHandler";

/**
 * Sets a handler for a specific command.
 * @param {string} text - The command text to listen for (e.g., "/start").
 * @param {Function} customHandler - The custom handler function to be executed when the command is received.
 * @returns {boolean} Returns `true` if the handler is successfully set, or `false` if there is an error or if the command format is invalid.
 */
export const hearCommand = (text: string, customHandler: (ctx: ICtx) => void): boolean => {
    try {
        if (text.length > 4096) return false;

        return setCommandHandler(text, customHandler);
    } catch (error) {
        console.error(`Error in hearCommand: ${error}`);
        return false;
    }
};