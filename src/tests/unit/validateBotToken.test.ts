import { validateBotToken } from "../../utils/validators";

describe('validateBotToken', () => {
    it('should return true for a valid token', () => {
        const validToken = 'CB:' + '1234567890123456789012345678901234567890123456789012345678901234';
        expect(validateBotToken(validToken)).toBe(true);
    });

    it('should return false for an invalid token', () => {
        const invalidToken = 'INVALIDTOKEN';
        expect(validateBotToken(invalidToken)).toBe(false);
    });

    it('should return false for a token with incorrect length', () => {
        const shortToken = 'CB:12345';
        const longToken = 'CB:' + '1234567890123456789012345678901234567890123456789012345678901234567890';
        expect(validateBotToken(shortToken)).toBe(false);
        expect(validateBotToken(longToken)).toBe(false);
    });

    it('should return false for a token that does not start with "CB:"', () => {
        const noPrefixToken = '1234567890123456789012345678901234567890123456789012345678901234';
        expect(validateBotToken(noPrefixToken)).toBe(false);
    });

    it('should return false for an empty string', () => {
        expect(validateBotToken('')).toBe(false);
    });
});