import { botVariables } from "../../config";
import { hearMessage } from "../../services/hearMessage";


jest.mock('../../config');

describe('hearMessage', () => {
    it('should set text handler for valid text', () => {
        const mockHandler = jest.fn();
        const text = 'Hello';

        const result = hearMessage(text, mockHandler);
        expect(result).toBe(true);
        expect(botVariables.setIsTextHandlerSet).toHaveBeenCalledWith(true);
    });

    it('should not set handler for too long text', () => {
        const mockHandler = jest.fn();
        const longText = 'a'.repeat(4100);

        const result = hearMessage(longText, mockHandler);
        expect(result).toBe(false);
    });
});