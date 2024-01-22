import * as crc32 from 'crc-32';
import { botVariables } from '../../config';
import { ICtx } from '../../types/context';

type record = {
    customHandler(ctx: ICtx): void;
};

const handlers: Record<string, record[]> = {};

/**
 * Generates a key for the given text using CRC-32.
 * @param {string} text - The text for which the key is generated.
 * @returns {string} The generated key.
 */
const getKey = (text: string) => {
    return String(crc32.str(text));
}

/**
 * Checks and executes the text handler for the given message object.
 * @param {ICtx} ctx - The message object received from the bot.
 * @returns {boolean} Returns `true` if a handler is executed, otherwise `false`.
 */
export const checkTextHandler = async (ctx: ICtx) => {
    try {
        if (!botVariables.getIsTextHandlerSet()) return false

        const key = getKey(ctx.message.text);
        const handler = handlers[key];

        if (!handler) return false;

        for (const el of handler) {
            el.customHandler(ctx);
        }

        return true;
    } catch (error) {
        console.error(`Error in checkTextHandler: ${error}`);
        return false;
    }
};

/**
 * Sets a text handler for a specific text.
 * @param {string} text - The text for which the handler is set.
 * @param {Function} customHandler - The custom handler function to execute when the text is received.
 * @returns {boolean} Returns `true` if the handler is successfully set, otherwise `false`.
 */
export const setTextHandler = async (text: string, customHandler: (ctx: ICtx) => void) => {
    try {
        const key = getKey(text);
        if (!handlers[key]) {
            handlers[key] = [];
        }
        handlers[key].push({ customHandler });

        botVariables.setIsTextHandlerSet(true);
        return true;
    } catch (error) {
        console.error(`Error in setTextHandler: ${error}`);
        return false;
    }
};