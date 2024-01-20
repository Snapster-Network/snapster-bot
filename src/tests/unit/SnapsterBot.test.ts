import SnapsterBot from "../../core/Bot";
import { hearCommand } from "../../services/hearCommand";
import { hearMessage } from "../../services/hearMessage";
import { sendMessage } from "../../services/sendMessage";


jest.mock('../../services/sendMessage');
jest.mock('../../services/hearMessage');
jest.mock('../../services/hearCommand');

describe('SnapsterBot', () => {
    let bot: SnapsterBot;

    beforeEach(() => {
        bot = new SnapsterBot('CB:D48B1CEE04DD582F13C683DE82037BAA97231EC52057A5CC730A011D93E13350', 100);
    });

    describe('constructor', () => {
        it('should create an instance of SnapsterBot', () => {
            expect(bot).toBeInstanceOf(SnapsterBot);
        });

    });

    describe('sendMessage', () => {
        it('should call sendMessage service with correct parameters', async () => {
            const chatId = 'chat-123';
            const text = 'Hello, world!';

            await bot.sendMessage(chatId, text);

            expect(sendMessage).toHaveBeenCalledWith('CB:D48B1CEE04DD582F13C683DE82037BAA97231EC52057A5CC730A011D93E13350', chatId, text);
        });
    });

    describe('hearMessage', () => {
        it('should call hearMessage service with correct parameters', async () => {
            const text = 'Hello';
            const customHandler = jest.fn();

            await bot.hearMessage(text, customHandler);

            expect(hearMessage).toHaveBeenCalledWith(text, customHandler);
        });
    });

    describe('hearCommand', () => {
        it('should call hearCommand service with correct parameters', async () => {
            const command = '/start';
            const customHandler = jest.fn();

            await bot.hearCommand(command, customHandler);

            expect(hearCommand).toHaveBeenCalledWith(command, customHandler);
        });
    });
});