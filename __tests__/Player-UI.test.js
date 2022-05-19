import * as HttpClient from '../src/WebAudioPlayer/components/HttpClient';
jest.mock('../src/WebAudioPlayer/components/HttpClient.js', () => {
    const mockGet = jest.fn().mockImplementation(() => Promise.resolve(JSON.parse(`{
            "name": "Ttttt",
            "info": "",
            "tracks":
            [
                {
                    "copyright":"2007 East 3rd Street Ensemble",
                    "path":"./audio/stub1.mp3",
                    "info":"",
                    "mime":"audio/mpeg",
                    "title":"Track 1"
                }
            ]
        }`)));

    return {
        __esModule: true,
        get: mockGet
    }
});

import * as WebAudioPlayer from '../src/WebAudioPlayer/WebAudioPlayer';
import { _checkHtml5AudioSupport, __RewireAPI__ as WebAudioPlayerRewireAPI } from '../src/WebAudioPlayer/WebAudioPlayer';

describe('Web Audio Player UI Tests', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, originalAudioPage, playaNode;
    let result;
    let events = {};

    beforeAll(async () => {
        originalAudioPage = await JSDOM.fromFile(path.resolve(__dirname, 'Stubs/audio-player.html'));
        originalAudioPage.window.HTMLAudioElement.addEventListener = jest.fn(
            (event, callback) => {
                events[event] = callback;
            });
        WebAudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
            return 'probably';
        });
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });
    });

    beforeEach(() => {
        audioPage   = originalAudioPage;
        playaNode   = audioPage.window.document.getElementById('my-boom-box');
        result      = WebAudioPlayer.init(
            playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        jest.resetModules();
        events = {};
    });

    it('Playlist loaded', () => {
        const playlist = playaNode.querySelector('.playlist-scroll-box');
        const playlistItems = playlist.querySelectorAll('li');
        const playButton = playaNode.querySelector('.play-btn');
        const autoplayButton = playaNode.querySelector('.autoplay-btn');
        const nextButton = playaNode.querySelector('.next-track-btn');
        const prevButton = playaNode.querySelector('.prev-track-btn');
        const infoButton = playaNode.querySelector('.info-button');

        expect(result).toBe(audioPage.window.HTMLAudioElement);
        expect(playlist).toBeInstanceOf(audioPage.window.HTMLOListElement);
        expect(playlistItems.length).toBe(7);
        expect(playlist).toMatchSnapshot(playlist);
        expect(playButton).toBeInstanceOf(audioPage.window.HTMLButtonElement);
        expect(playButton.disabled).toBe(true);
        expect(autoplayButton).toBeInstanceOf(audioPage.window.HTMLButtonElement);
        expect(autoplayButton.disabled).toBe(true);
        expect(nextButton).toBeInstanceOf(audioPage.window.HTMLButtonElement);
        expect(nextButton.disabled).toBe(true);
        expect(prevButton).toBeInstanceOf(audioPage.window.HTMLButtonElement);
        expect(prevButton.disabled).toBe(true);
        expect(infoButton).toBeInstanceOf(audioPage.window.HTMLButtonElement);
        expect(infoButton.disabled).toBe(true);
    });

    it('Playlist clicked on', () => {
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const screenTitle = playaNode.querySelector('.screen-title');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');
        const observer = new audioPage.window.MutationObserver((mutationsList, observer) => {
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    expect(screenTitle).toBeInstanceOf(audioPage.window.HTMLParagraphElement);
                    expect(screenTitle.innerHTML).toBe('Ttttt');
                    expect(scrollBox.childElementCount).toBe(1);
                }
            }

            observer.disconnect();
        });
        const config = { attributes: true, childList: true, subtree: true };
    	observer.observe(screenTitle, config);

        playlistButton.click();
    });
});
