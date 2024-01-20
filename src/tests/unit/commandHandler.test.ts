import { checkCommandHandler, setCommandHandler } from "../../utils/handlers/commandHandler";

describe('commandHandler', () => {
    const command = '/test';
    const mockHandler = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('setCommandHandler', () => {
        it('should set a handler for a command', () => {
            setCommandHandler(command, mockHandler);
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });

    describe('checkCommandHandler', () => {
        it('should call the handler when the command is triggered', () => {
            setCommandHandler(command, mockHandler);
            checkCommandHandler({
                date: new Date('2024-01-20T01:05:46.145Z'),
                chat: 'd:65aa43350b1d9be52690d2cc',
                message_id: '65ab1c6a997c3dfaac59a2ba',
                from: 'd:65aa43350b1d9be52690d2cc',
                text: command
            });
            expect(mockHandler).toHaveBeenCalled();
        });

        it('should not call the handler when a different command is triggered', () => {
            setCommandHandler(command, mockHandler);
            checkCommandHandler({
                date: new Date('2024-01-20T01:05:46.145Z'),
                chat: 'd:65aa43350b1d9be52690d2cc',
                message_id: '65ab1c6a997c3dfaac59a2ba',
                from: 'd:65aa43350b1d9be52690d2cc',
                text: '/different'
            });
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });
});