import * as HttpClient from '../src/WebAudioPlayer/components/HttpClient';
jest.mock('../src/WebAudioPlayer/components/HttpClient.js', () => {
    const mockGet = jest.fn().mockImplementation(() => Promise.resolve(JSON.parse(`{
            "name": "Ttttt",
            "info": "",
            "tracks":
            [
                {
                    "copyright":"2007 East 3rd Street Ensemble",
                    "path":"./audio/short-1.mp3",
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

    let audioPage, playaNode;
    let result;

    beforeEach(async () => {
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
    });

    it('Playlists list loaded', () => {
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
        expect(playaNode.classList.contains('paused')).toBe(true);
    });

    it('Playlist clicked on', () => {
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const screenTitle = playaNode.querySelector('.screen-title');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');
        const mobserver = new audioPage.window.MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLParagraphElement);
                    expect(mutation.target.innerHTML).toBe('Ttttt');
                    expect(scrollBox.childElementCount).toBe(1);
                }
            }

            observer.disconnect();
        });
        const config = { childList: true };
    	mobserver.observe(screenTitle, config);

        playlistButton.click();
    });

    it('Playlist loaded, Track clicked on', () => {
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            expect(scrollBox.childElementCount).toBe(1);
            expect(mutationsList[0].type).toBe('childList');

            const li = scrollBox.querySelector('li:first-child');
            const configB = {attributes: true};

            observer.observe(li, configB);

            const trackButton = li.querySelector('button');
            trackButton.click();

            try {
                await audioPage.window.HTMLAudioElement.canplay();
                audioPage.window.HTMLAudioElement.playing();

                expect(li.classList.length).toBe(1);
                expect(li.classList.contains('current')).toBe(true);

                observer.disconnect();
            }
            catch (err) {
                observer.disconnect();
                throw err;
            }
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it('Playlist loaded, play button clicked on', () => {
        const playButton = playaNode.querySelector('.play-btn');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            expect(scrollBox.childElementCount).toBe(1);
            expect(mutationsList[0].type).toBe('childList');

            const li = scrollBox.querySelector('li:first-child');
            const configB = {attributes: true};
            observer.observe(li, configB);
            playButton.click();

            try {
                await audioPage.window.HTMLAudioElement.canplay();
                audioPage.window.HTMLAudioElement.playing();

                expect(li.classList.length).toBe(1);
                expect(li.classList.contains('current')).toBe(true);
                expect(playaNode.classList.contains('playing')).toBe(true);

                observer.disconnect();
            }
            catch (err) {
                observer.disconnect();
                throw err;
            }
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it('Playlist loaded, autoplay button clicked on', () => {
        const autoplayButton = playaNode.querySelector('.autoplay-btn');

        expect(autoplayButton.disabled).toBe(true);
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            expect(scrollBox.childElementCount).toBe(1);

            for (const m of mutationsList) {
                if (m.type === 'childList') {
                    autoplayButton.click();

                    if (playaNode.classList.length === 4) {
                        expect(playaNode.classList.contains('autoplay')).toBe(true);
                    }
                }
            };

            mobserver.disconnect();
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it('Playlists loaded, volume button clicked on', () => {
        const volumeButton = playaNode.querySelector('.volume-button');
        const volumeSliderBox = playaNode.querySelector('.volume-slider-mute-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            for (const m of mutationsList) {
                if (m.type === 'attributes') {
                    expect(m.target.classList.contains('play')).toBe(true);
                    expect(m.target.querySelector('input').disabled).toBe(true);
                    expect(m.target.querySelector('button').disabled).toBe(true);
                }
            };

            mobserver.disconnect();
        });

        const config = {attributes: true};
    	mobserver.observe(volumeSliderBox, config);
        volumeButton.click();
    });

    it('Playlist loaded, volume button clicked on', () => {
        const volumeButton = playaNode.querySelector('.volume-button');
        const volumeSliderBox = playaNode.querySelector('.volume-slider-mute-box');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            expect(scrollBox.childElementCount).toBe(1);

            for (const m of mutationsList) {
                if (m.type === 'childList') {
                    const config = {attributes: true};
                	mobserver.observe(volumeSliderBox, config);
                    volumeButton.click();

                    console.debug(m.type);
                    if (m.type === 'attributes') {
                        expect(volumeSliderBox.classList.contains('play')).toBe(true);
                        expect(m.target.querySelector('input').disabled).toBe(false);
                        expect(m.target.querySelector('button').disabled).toBe(false);
                    }
                }
            };

            mobserver.disconnect();
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });
});
