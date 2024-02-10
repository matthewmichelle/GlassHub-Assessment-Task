import fetchData from './data/fetch.user.data';

describe('fetchData', () => {
    let mockData: any;

    beforeEach(() => {
        // Mocking fetch API to return mock data
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            }) as any
        );
    });

    test('fetches data successfully', async () => {
        mockData = { id: 1, name: 'Test Data' };

        const data = await fetchData();
        console.log("data", data)

        expect(data).toEqual(mockData);
    });

    test('handles errors', async () => {
        // Mocking fetch API to simulate an error response
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Failed to fetch data'))
        );

        await expect(fetchData()).rejects.toThrow('Failed to fetch data');
    });
});
