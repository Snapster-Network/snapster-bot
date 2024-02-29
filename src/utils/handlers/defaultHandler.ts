import { botVariables } from '../../config';
import { ICtx } from '../../types/context';

let handler: (ctx: ICtx) => void = () => false

/**
 * Handles new incoming messages.
 * Executes a predefined handler if the new message handler is set.
 * 
 * @param {ICtx} ctx - The context of the bot interaction, providing access to bot, message, scene, and session information.
 * @returns {Promise<boolean>} Returns true if the handler is executed successfully, false otherwise.
 */
export const handleNewMessage = async (ctx: ICtx) => {
    try {
        if (!botVariables.getIsNewMessageHandlerSet() || !handler) return false

        handler(ctx);
        return true;
    } catch (error) {
        console.error(`Error in handleNewMessage: ${error}`);
        return false;
    }
};

/**
 * Sets a custom handler for new messages.
 * Updates the global handler to the provided custom handler function.
 * 
 * @param {function(ICtx): void} customHandler - A custom function to handle new messages, taking the bot context as its parameter.
 * @returns {Promise<boolean>} Returns true if the handler is set successfully, false otherwise.
 */
export const setNewMessageHandler = async (customHandler: (ctx: ICtx) => void) => {
    try {
        handler = customHandler

        botVariables.setIsNewMessageHandlerSet(true);
        return true;
    } catch (error) {
        console.error(`Error in setNewMessageHandler: ${error}`);
        return false;
    }
};