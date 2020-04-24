const SoundPlayer = require('../sound-player');
const SoundPlayerConsumer = require('../sound-player-consumer');
jest.mock('../sound-player'); // SoundPlayer is now a mock constructor

/*
 * Here the whole class is mocked. All its methods will return 'undefined'
 * If you use arrow functions, this will not be mocked
 * This does not replace the class implementation, only let you spy on it
 */

describe('', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        SoundPlayer.mockClear();
    });

    it('We can check if the consumer called the class constructor', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(SoundPlayer).toHaveBeenCalledTimes(1);
    });

    it('We can check if the consumer called a method on the class instance', () => {
        // Show that mockClear() is working:
        expect(SoundPlayer).not.toHaveBeenCalled();

        const soundPlayerConsumer = new SoundPlayerConsumer();
        // Constructor should have been called again:
        expect(SoundPlayer).toHaveBeenCalledTimes(1);

        const coolSoundFileName = 'song.mp3';
        soundPlayerConsumer.playSomethingCool();

        // mock.instances is available with automatic mocks:
        const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
        const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
        expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
        // Equivalent to above check:
        expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
        expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
    });
});