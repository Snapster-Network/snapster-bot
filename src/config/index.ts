import { IBotVariables } from "../types/bot";

/**
 * Base URL for the Snapster API.
 */
export const SNAPSTER_API_URL = 'http://localhost:3000';

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
};