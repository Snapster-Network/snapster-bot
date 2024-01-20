/**
 * Validates the format of a bot token.
 * @param {string} token - The bot token to be validated.
 * @returns {boolean} Returns `true` if the token is valid, `false` otherwise.
 * 
 * A valid bot token should start with "CB:" and have a length of 67 characters.
 */
function validateBotToken(token: string): boolean {
    if (!token) return false;
    const startsWithCB = token.startsWith("CB:");
    const hasCorrectLength = token.length === 67;

    return startsWithCB && hasCorrectLength;
}

export { validateBotToken }