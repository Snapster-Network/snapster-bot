import axios from 'axios';
import { longPollingRequest } from '../../utils/longPollingRequest';
import { SNAPSTER_API_URL } from '../../config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('longPollingRequest', () => {
    it('should return data on successful request', async () => {
        const mockData = { messages: ['msg1', 'msg2'] };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await longPollingRequest('test-token', 100);
        expect(result).toBe(mockData);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${SNAPSTER_API_URL}/v1/botApi/getUpdates?timeout=100`, {
            headers: {
                Authorization: `Bearer test-token`
            }
        });
    });

    it('should return false on request failure', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Request failed'));

        const result = await longPollingRequest('test-token', 100);
        expect(result).toBe(false);
    });
});