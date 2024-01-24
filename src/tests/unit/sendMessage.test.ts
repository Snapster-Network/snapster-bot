import axios from 'axios';
import { sendMessage } from '../../services/sendMessage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('sendMessage', () => {
    it('should send a message and return true', async () => {
        mockedAxios.post.mockResolvedValue({ data: { code: 200 } });

        const result = await sendMessage('CB:D48B1CEE04DD582F13C683DE82037BAA97231EC52057A5CC730A011D93E13350', 'p:65a7afe9fde5915a1c6f01b0', 'Hello, world!');
        expect(result).toBe(true);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/v1/botApi/sendMessage', {
            chat_id: '123456',
            text: 'Hello, world!'
        }, {
            headers: {
                Authorization: 'Bearer test-token'
            }
        });
    });

    it('should return false on API error', async () => {
        mockedAxios.post.mockRejectedValue(new Error('API Error'));

        const result = await sendMessage('test-token', '123456', 'Hello, world!');
        expect(result).toBe(false);
    });
});