export const mockAudioElementApi = jest.fn(() => '');
export const mockCanPlayType = jest.fn(() => 'maybe');

const mock = jest.fn().mockImplementation(() => {
    return {
        canPlayType: mockCanPlayType,
        playSoundFile: mockAudioElementApi
    };
});

export default mock;
