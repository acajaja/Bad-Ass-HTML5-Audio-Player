jest.mock('../../../src/WebAudioPlayer/components/HttpClient.js');
import * as HttpClient from '../../../src/WebAudioPlayer/components/HttpClient';
import { getMockJsonPLaylist } from '../../Stubs/MockJson';
import * as WebAudioPlayer from '../../../src/WebAudioPlayer/WebAudioPlayer';
// import { _checkHtml5AudioSupport, __RewireAPI__ as WebAudioPlayerRewireAPI } from '../../../src/WebAudioPlayer/WebAudioPlayer';

describe('Web Audio Player UI Tests', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, playaNode;
    let result;

    beforeEach(async () => {
        const mockJson = getMockJsonPLaylist('Ttttt');
        HttpClient.get.mockImplementationOnce(async () => await Promise.resolve(mockJson));

        audioPage = await JSDOM.fromFile(path.resolve(__dirname, '../../Stubs/audio-player.html'));
        audioPage.window.HTMLAudioElement.addEventListener = jest.fn((event, callback) => {
            audioPage.window.HTMLAudioElement[event] = jest.fn(callback);
        });
        audioPage.window.HTMLAudioElement['load'] = jest.fn();
        audioPage.window.HTMLAudioElement['play'] = jest.fn(async () => { await 1 + 1; });
        audioPage.window.HTMLAudioElement['canPlayType'] = jest.fn(() => 'probably');
        audioPage.window.HTMLAudioElement['seekable'] = {end: jest.fn()};
        // WebAudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
        //     return 'probably';
        // });
        // WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
        //     return true;
        // });

        playaNode   = audioPage.window.document.getElementById('my-boom-box');
        result      = WebAudioPlayer.init(
            playaNode, audioPage.window, audioPage.window.HTMLAudioElement);
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('Playlists list loaded', () => {
        const playlist = playaNode.querySelector('.playlist-scroll-box');
        // const playlistItems = playlist.querySelectorAll('li');
        const playButton = playaNode.querySelector('.play-btn');
        const autoplayButton = playaNode.querySelector('.autoplay-btn');
        const nextButton = playaNode.querySelector('.next-track-btn');
        const prevButton = playaNode.querySelector('.prev-track-btn');
        const infoButton = playaNode.querySelector('.info-button');

        expect(result).toBe(audioPage.window.HTMLAudioElement);
        expect(playlist).toBeInstanceOf(audioPage.window.HTMLOListElement);
        expect(playlist.childElementCount).toBe(7);
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

    it('Playlist clicked on - should load mock playlist', () => {
        const spinner = playaNode.querySelector('.net-stat-box');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const screenTitle = playaNode.querySelector('.screen-title');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        expect(scrollBox.childElementCount).toBe(7);

        const mobserver = new audioPage.window.MutationObserver((mutationsList, observer) => {
            expect(mutationsList.length).toBe(1);
            const mutation = mutationsList[0];

            switch (mutation.type.toLowerCase()) {
                case 'childlist':
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLParagraphElement);
                    expect(mutation.target.innerHTML).toBe('Ttttt');
                    expect(scrollBox.childElementCount).toBe(1);
                    break;
                case 'attributes':
                    expect(mutation.target.classList.contains('play')).toBe(true);
                    break;
            }
        });

    	mobserver.observe(spinner, { attributes: true });
    	mobserver.observe(screenTitle, { childList: true });

        playlistButton.click();
    });

    it('Playlist loaded, Track clicked on - should play track', () => {
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            let mutation = mutationsList[0];

            switch (mutationsList.length) {
                case 1:
                    expect(mutation.type).toBe('attributes');
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLLIElement);
                    expect(mutation.target.classList.length).toBe(1);
                    expect(mutation.target.classList.contains('current')).toBe(true);
                    break;
                case 8:
                    const node = mutation.target;
                    expect(node.childElementCount).toBe(1);
                    expect(mutation.type).toBe('childList');

                    const li = scrollBox.querySelector('li:first-child');
                    expect(li.classList.contains('current')).toBe(false);

                    observer.observe(li, {attributes: true});

                    const trackButton = li.querySelector('button');
                    trackButton.click();

                    try {
                        await audioPage.window.HTMLAudioElement.canplay();
                        audioPage.window.HTMLAudioElement.playing();
                    }
                    catch (err) {
                        throw err;
                    }
                    break;
            }
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it('Playlist loaded, play button clicked on - should play track', () => {
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
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it('Playlists loaded, volume button clicked on, vol slider not active', () => {
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
        });

        const config = {attributes: true};
    	mobserver.observe(volumeSliderBox, config);
        volumeButton.click();
    });

    it('Playlist loaded, toggle volume', () => {
        const volumeButton = playaNode.querySelector('.volume-button');
        const volumeSliderBox = playaNode.querySelector('.volume-slider-mute-box');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        expect(scrollBox.childElementCount).toBe(7);

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            switch (mutationsList.length) {
                case 2:
                    expect(mutationsList[0].type.toLowerCase()).toBe('attributes');
                    expect(mutationsList[1].type.toLowerCase()).toBe('attributes');

                    const volButt = mutationsList[0].target;
                    const volSliderBox = mutationsList[1].target;

                    expect(volButt.classList.contains('volume-button')).toBe(true);
                    expect(volSliderBox.classList.contains('volume-slider-mute-box')).toBe(true);
                    
                    const input = volSliderBox.querySelector('input');
                    const muteButt = volSliderBox.querySelector('button');

                    if (volButt.classList.contains('active')) {
                        expect(input.disabled).toBe(false);
                        expect(muteButt.disabled).toBe(false);
                        expect(volSliderBox.classList.contains('play')).toBe(true);

                        // Click volume butt again to hide
                        volumeButton.click();
                    }
                    else {
                        expect(volSliderBox.classList.contains('play')).toBe(false);
                    }

                    break;
                case 8:
                    expect(mutationsList[0].type.toLowerCase()).toBe('childlist');
                    // Click volume butt to show
                    volumeButton.click();
                    break;
                default:
                    console.error(777);
                    break;
            }
        });

        mobserver.observe(scrollBox, {childList: true});
        mobserver.observe(volumeButton, {attributes: true, attributeFilter: ['class']});
        mobserver.observe(volumeSliderBox, {attributes: true, attributeFilter: ['class']});
        playlistButton.click();
    });

    it('Playlist loaded, toggle mute button', () => {
        const volumeButton = playaNode.querySelector('.volume-button');
        const volumeSlider = playaNode.querySelector('.volume-slider');
        const volumeSliderBox = playaNode.querySelector('.volume-slider-mute-box');
        const muteButton = playaNode.querySelector('.mute-button');
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');

        expect(scrollBox.childElementCount).toBe(7);

        const mobserver = new audioPage.window.MutationObserver((mutationsList, observer) => {
            switch (mutationsList.length) {
                case 1:
                    expect(mutationsList[0].type.toLowerCase()).toBe('attributes');
                    const target = mutationsList[0].target;

                    if (target.classList.contains('volume-slider-mute-box')) {
                        expect(target.classList.contains('play')).toBe(true);
                        expect(muteButton.disabled).toBe(false);

                        // Click mute button to mute
                        muteButton.click();
                    }
                    else if (target.classList.contains('web-audio-player')) {
                        if (target.classList.contains('muted')) {
                            expect(parseInt(volumeSlider.value)).toBe(0);
                            // Click mute button again to un-mute
                            muteButton.click();
                        }
                        else {
                            // Here, we know that the 'muted' class has been removed
                            expect(target.classList.contains('muted')).toBe(false);
                            expect(parseInt(volumeSlider.value)).toBe(0);
                        }
                    }

                    break;
                case 8:
                    expect(mutationsList[0].type.toLowerCase()).toBe('childlist');
                    // Click volume butt to show
                    volumeButton.click();
                    break;
            }
        });

        mobserver.observe(scrollBox, {childList: true});
        mobserver.observe(playaNode, {attributes: true, attributeFilter: ['class']});
        mobserver.observe(volumeSliderBox, {attributes: true, attributeFilter: ['class']});
        playlistButton.click();
    });

    it ('Play throws', () => {
        audioPage.window.HTMLAudioElement['play'] = jest.fn(async () => { await Promise.reject(); });
        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');
        const seekHandleBox = playaNode.querySelector('.seek-handle-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            let mutation = mutationsList[0];

            switch (mutationsList.length) {
                case 1:
                    expect(mutation.type).toBe('attributes');
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLLIElement);
                    expect(mutation.target.classList.length).toBe(1);
                    expect(mutation.target.classList.contains('current')).toBe(true);
                    expect(seekHandleBox.disabled).toBe(true);
                    break;
                case 8:
                    const node = mutation.target;
                    expect(node.childElementCount).toBe(1);
                    expect(mutation.type).toBe('childList');
                    expect(seekHandleBox.disabled).toBe(false);

                    const li = scrollBox.querySelector('li:first-child');
                    expect(li.classList.contains('current')).toBe(false);

                    observer.observe(li, {attributes: true});

                    const trackButton = li.querySelector('button');
                    trackButton.click();

                    try {
                        await audioPage.window.HTMLAudioElement.canplay();
                        audioPage.window.HTMLAudioElement.playing();
                    }
                    catch (err) {
                        throw err;
                    }
                    break;
            }
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });

    it ('No track info', () => {
        const mockJson = getMockJsonPLaylist('No info', false);
        HttpClient.get.mockImplementationOnce(async () => await Promise.resolve(mockJson));

        const playlistButton = playaNode.querySelector('.playlist-scroll-box li:first-child > button');
        const scrollBox = playaNode.querySelector('.playlist-scroll-box');
        const seekHandleBox = playaNode.querySelector('.seek-handle-box');

        const mobserver = new audioPage.window.MutationObserver(async (mutationsList, observer) => {
            let mutation = mutationsList[0];

            switch (mutationsList.length) {
                case 1:
                    expect(mutation.type).toBe('attributes');
                    expect(mutation.target).toBeInstanceOf(audioPage.window.HTMLLIElement);
                    expect(mutation.target.classList.length).toBe(1);
                    expect(mutation.target.classList.contains('current')).toBe(true);
                    expect(seekHandleBox.disabled).toBe(false);
                    break;
                case 8:
                    const node = mutation.target;
                    expect(node.childElementCount).toBe(1);
                    expect(mutation.type).toBe('childList');
                    expect(seekHandleBox.disabled).toBe(false);

                    const li = scrollBox.querySelector('li:first-child');
                    expect(li.classList.contains('current')).toBe(false);

                    observer.observe(li, {attributes: true});

                    const trackButton = li.querySelector('button');
                    trackButton.click();

                    try {
                        await audioPage.window.HTMLAudioElement.canplay();
                        audioPage.window.HTMLAudioElement.playing();
                    }
                    catch (err) {
                        throw err;
                    }
                    break;
            }
        });

        const config = {childList: true};
    	mobserver.observe(scrollBox, config);
        playlistButton.click();
    });
});
