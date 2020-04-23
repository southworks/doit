const SoundPlayer = require('../sound-player');
const SoundPlayerConsumer = require('../sound-player-consumer');
const mockPlaySoundFile = jest.fn();
jest.mock('../sound-player');

describe('', () => {
    beforeEach(() => {
        SoundPlayer.mockClear(); //Clean the calls done between each test
        mockPlaySoundFile.mockClear();
    });

    beforeAll(() => {
        SoundPlayer.mockImplementation(() => {
            return {
                playSoundFile: () => {
                    throw new Error('Test error');
                },
            };
        });
    });

    test('Should throw an error when calling playSomethingCool', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
    });
});