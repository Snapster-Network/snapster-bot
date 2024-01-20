/**
 * Interface for bot variables configuration.
 */
interface IBotVariables {
    /** Indicates whether a text handler has been set. */
    _isTextHandlerSet: boolean;

    /**
     * Sets the state of the text handler.
     * @param {boolean} res - The new state to set for the text handler.
     */
    setIsTextHandlerSet(res: boolean): void;

    /**
     * Gets the state of the text handler.
     * @returns {boolean} The current state of the text handler.
     */
    getIsTextHandlerSet(): boolean;

    /** Indicates whether a command handler has been set. */
    _isCommandHandlerSet: boolean;

    /**
     * Sets the state of the command handler.
     * @param {boolean} res - The new state to set for the command handler.
     */
    setIsCommandHandlerSet(res: boolean): void;

    /**
     * Gets the state of the command handler.
     * @returns {boolean} The current state of the command handler.
     */
    getIsCommandHandlerSet(): boolean;
}

export { IBotVariables }