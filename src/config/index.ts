import { IBotVariables } from "../types/bot";

/**
 * Base URL for the Snapster API.
 */
export const SNAPSTER_API_URL = 'https://messages.api.snapster.com.ua';

/**
 * Bot variables configuration.
 * @implements {IBotVariables}
 */
export const botVariables: IBotVariables = {
    _isTextHandlerSet: false,
    setIsTextHandlerSet: function (res: boolean) {
        this._isTextHandlerSet = res;
    },
    getIsTextHandlerSet: function () {
        return this._isTextHandlerSet;
    },

    _isCommandHandlerSet: false,
    setIsCommandHandlerSet: function (res: boolean) {
        this._isCommandHandlerSet = res;
    },
    getIsCommandHandlerSet: function () {
        return this._isCommandHandlerSet;
    },

    _isNewMessageHandlerSet: false,
    setIsNewMessageHandlerSet: function (res: boolean) {
        this._isNewMessageHandlerSet = res;
    },
    getIsNewMessageHandlerSet: function () {
        return this._isNewMessageHandlerSet;
    },
};