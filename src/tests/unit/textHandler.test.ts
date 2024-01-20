import { checkTextHandler, setTextHandler } from "../../utils/handlers/textHandler";

describe('textHandler', () => {
    const text = 'Hello';
    const mockHandler = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('setTextHandler', () => {
        it('should set a handler for a text', () => {
            setTextHandler(text, mockHandler);
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });

    describe('checkTextHandler', () => {
        it('should call the handler when the text is triggered', () => {
            setTextHandler(text, mockHandler);
            checkTextHandler({
                date: new Date('2024-01-20T01:05:46.145Z'),
                chat: 'd:65aa43350b1d9be52690d2cc',
                message_id: '65ab1c6a997c3dfaac59a2ba',
                from: 'd:65aa43350b1d9be52690d2cc',
                text: text
            });
            expect(mockHandler).toHaveBeenCalled();
        });

        it('should not call the handler when a different text is triggered', () => {
            setTextHandler(text, mockHandler);
            checkTextHandler({
                date: new Date('2024-01-20T01:05:46.145Z'),
                chat: 'd:65aa43350b1d9be52690d2cc',
                message_id: '65ab1c6a997c3dfaac59a2ba',
                from: 'd:65aa43350b1d9be52690d2cc',
                text: 'Goodbye'
            });
            expect(mockHandler).not.toHaveBeenCalled();
        });
    });
});