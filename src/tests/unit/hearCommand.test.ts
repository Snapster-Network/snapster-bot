import { botVariables } from "../../config";
import { hearCommand } from "../../services/hearCommand";

jest.mock('../config');

describe('hearCommand', () => {
    it('should set command handler for valid command', () => {
        const result = hearCommand('/start', () => { });
        expect(result).toBe(true);
        expect(botVariables.setIsCommandHandlerSet).toHaveBeenCalledWith(true);
    });

    it('should not set handler for invalid command', () => {
        const result = hearCommand('notacommand', () => { });
        expect(result).toBe(false);
    });

    it('should not set handler for too long command', () => {
        const longCommand = '/'.repeat(4100);
        const result = hearCommand(longCommand, () => { });
        expect(result).toBe(false);
    });
});