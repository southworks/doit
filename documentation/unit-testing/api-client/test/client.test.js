const axios = require('axios');
const client = require('../client');
jest.mock('axios');

test('mockImplentation', () => {
    const tasks = [
        {
            is_completed: true,
            deleted: false,
            _id: '5e9e11a11f0bfb18d49a9aa9',
            name: 'meter datos16',
            created_at: '2020-04-20T21:18:25.646Z',
            __v: 0
        }
    ];
    const resp = {data:tasks, status: 200};
    axios.get.mockResolvedValue(resp);
    
    return client.getTasks((result) => {
        expect(result.data).toEqual(tasks)
    });
});