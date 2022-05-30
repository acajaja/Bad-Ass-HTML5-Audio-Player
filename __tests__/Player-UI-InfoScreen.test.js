jest.mock('../src/WebAudioPlayer/components/HttpClient.js');
import * as HttpClient from '../src/WebAudioPlayer/components/HttpClient';
import { getMockJsonPLaylist } from './Stubs/MockJson';
import * as WebAudioPlayer from '../src/WebAudioPlayer/WebAudioPlayer';
import { _checkHtml5AudioSupport, __RewireAPI__ as WebAudioPlayerRewireAPI } from '../src/WebAudioPlayer/WebAudioPlayer';

describe('Web Audio Player UI Tests - Info Screen', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, playaNode;
    let result;

    beforeEach(async () => {
        const mockJson = getMockJsonPLaylist('Ttttt');
        HttpClient.get.mockImplementationOnce(async () => await Promise.resolve(mockJson));

        audioPage = await JSDOM.fromFile(path.resolve(__dirname, 'Stubs/audio-player.html'));
        audioPage.window.HTMLAudioElement.addEventListener = jest.fn((event, callback) => {
            audioPage.window.HTMLAudioElement[event] = jest.fn(callback);
        });
        audioPage.window.HTMLAudioElement['load'] = jest.fn();
        audioPage.window.HTMLAudioElement['play'] = jest.fn(async () => { await 1 + 1; });
        audioPage.window.HTMLAudioElement['seekable'] = {end: jest.fn()};
        WebAudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
            return 'probably';
        });
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });

        playaNode   = audioPage.window.document.getElementById('my-boom-box');
        result      = WebAudioPlayer.init(
            playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('', () => {
        const infoScreen = playaNode.querySelector('.info-screen');
        const playlist = playaNode.querySelector('.playlist-scroll-box');
        const infoButton = playaNode.querySelector('.info-button');

        expect(playlist.childElementCount).toBe(7);
        expect(infoScreen.classList.contains('play')).toBe(false);
        expect(infoButton.disabled).toBe(true);

        const allPlaylistsButton = playaNode.querySelector('button.playlist-btn');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const mobserver = new audioPage.window.MutationObserver((mutationsList, observer) => {
            let mutation = mutationsList[0];

            switch (mutationsList.length) {
                case 1:
                    expect(mutation.type).toBe('attributes');
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLDivElement);

                    if (mutation.target.classList.contains('play')) {
                        expect(true).toBe(true);
                        infoButton.click();
                    }
                    else {
                        // This is what we expect here
                        expect(true).toBe(true);
                        allPlaylistsButton.click();
                    }

                    break;
                case 8:
                    const node = mutation.target;
                    expect(node.childElementCount).toBe(1);
                    expect(mutation.type).toBe('childList');
                    expect(infoButton.disabled).toBe(false);
                    expect(mutation.target.classList.contains('play')).toBe(false);

                    infoButton.click();
                    break;
                case 11:
                    expect(mutation.type).toBe('attributes');
                    expect(mutation.target.classList.contains('play')).toBe(false);
                    expect(infoButton.disabled).toBe(true);
                    break;
            }
        });

        mobserver.observe(playlist, {childList: true});
    	mobserver.observe(infoScreen, {attributes: true});
        playlistButton.click();
    });
});
