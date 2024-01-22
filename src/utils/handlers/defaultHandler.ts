import { botVariables } from '../../config';
import { ICtx } from '../../types/context';

let handler: (ctx: ICtx) => void = () => false

export const handleNewMessage = async (ctx: ICtx) => {
    try {
        if (!botVariables.getIsNewMessageHandlerSet() || !handler) return false
            
        handler(ctx);

        return true;
    } catch (error) {
        console.error(`Error in checkTextHandler: ${error}`);
        return false;
    }
};

export const setNewMessageHandler = async (customHandler: (ctx: ICtx) => void) => {
    try {
        handler = customHandler

        botVariables.setIsNewMessageHandlerSet(true);
        return true;
    } catch (error) {
        console.error(`Error in setTextHandler: ${error}`);
        return false;
    }
};