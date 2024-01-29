import { botVariables } from '../../config';
import { ICtx } from '../../types/context';

const commandRegex = /^\/[a-z]+$/;

type record = {
    customHandler: (ctx: ICtx) => void
};

const handlers: Record<string, record[]> = {};

/**
 * Extracts the command key from the given text.
 * @param {string} text - The text containing the command.
 * @returns {string} The command key.
 */

const checkKey = (text: string) => {
    if (!commandRegex.test(text)) return false;
    else if (text.length > 50) return false;
    return true
}

const getKey = (text: string) => {
    return text.replace('/', '');
}

/**
 * Checks and executes the command handler for the given message object.
 * @param {ICtx} ctx - The message object received from the bot.
 * @returns {boolean} Returns `true` if a handler is executed, otherwise `false`.
 */
export const checkCommandHandler = async (ctx: ICtx) => {
    try {
        if (!botVariables.getIsCommandHandlerSet()) return false
        if (!checkKey(ctx.message.text)) return false

        const key = getKey(ctx.message.text);
        const handler = handlers[key];

        if (!handler) return false;

        for (const el of handler) {
            el.customHandler(ctx);
        }

        return true;
    } catch (error) {
        console.error(`Error in checkCommandHandler: ${error}`);
        return false;
    }
};

/**
 * Sets a command handler for a specific command.
 * @param {string} text - The command text (e.g., "/start").
 * @param {Function} customHandler - The custom handler function to execute when the command is received.
 * @returns {boolean} Returns `true` if the handler is successfully set, otherwise `false`.
 */
export const setCommandHandler = (text: string, customHandler: (ctx: ICtx) => void): boolean => {
    try {
        if (!commandRegex.test(text)) return false;

        const key = getKey(text);
        if (!handlers[key]) {
            handlers[key] = [];
        }
        handlers[key].push({ customHandler });

        botVariables.setIsCommandHandlerSet(true);
        return true;
    } catch (error) {
        console.error(`Error in setCommandHandler: ${error}`);
        return false;
    }
};