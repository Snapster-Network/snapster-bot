import { botVariables } from "../../config";

describe('botVariables', () => {
    describe('Text Handler State', () => {
        it('should correctly set and get the text handler state', () => {
            expect(botVariables.getIsTextHandlerSet()).toBe(false);
            botVariables.setIsTextHandlerSet(true);
            expect(botVariables.getIsTextHandlerSet()).toBe(true);
            botVariables.setIsTextHandlerSet(false);
            expect(botVariables.getIsTextHandlerSet()).toBe(false);
        });
    });

    describe('Command Handler State', () => {
        it('should correctly set and get the command handler state', () => {
            expect(botVariables.getIsCommandHandlerSet()).toBe(false);
            botVariables.setIsCommandHandlerSet(true);
            expect(botVariables.getIsCommandHandlerSet()).toBe(true);
            botVariables.setIsCommandHandlerSet(false);
            expect(botVariables.getIsCommandHandlerSet()).toBe(false);
        });
    });
});