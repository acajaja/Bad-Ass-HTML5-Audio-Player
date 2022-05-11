import * as HttpClient from '../src/components/HttpClient';
jest.mock('../src/components/HttpClient', () => {
    const mockGet = jest.fn().mockImplementation(async () => {
        return Promise.resolve(JSON.parse('{"a":23423432}'));
    });

    return {
        __esModule: true,
        get: mockGet
    }
});

import * as HTML5AudioPlayer from '../src/HTML5AudioPlayer';
import { _checkHtml5AudioSupport, __RewireAPI__ as HTML5AudioPlayerRewireAPI } from '../src/HTML5AudioPlayer';

describe('Web Audio Player Tests', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, playaNode;
    let origEnvs = {...process.env};

    beforeEach(async () => {
        audioPage = await JSDOM.fromFile(path.resolve(__dirname, 'Stubs/audio-player.html'));
        playaNode = audioPage.window.document.getElementById('my-boom-box');

        // await new Promise((resolve) =>
        //     audioPage.window.addEventListener('load', resolve)
        // );
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        jest.resetModules();
        process.env = origEnvs;
    });

    // it('No Audio tag support', async () => {
    //     const playaNode = audioPage.window.document.getElementById('my-boom-box');
    //     const result = await HTML5AudioPlayer.init(playaNode, HttpClient);

    //     expect(result).toBe(false);
    // });

    it('Init player - OK', async () => {
        HTML5AudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
            return 'probably';
        });
        HTML5AudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });

        const result    = await HTML5AudioPlayer.init(playaNode, audioPage.window.HTMLAudioElement);

        expect(HTML5AudioPlayer.version).toBe('0.6');
        expect(result).toBe(true);
        // expect(HttpClient).toHaveBeenCalledWith('https://me.local');
        // expect(HttpClient.mock.calls.length).toBe(1);
    });

    it('Init player - No Web Audio support', async () => {
        HTML5AudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return false;
        });
        const result = await HTML5AudioPlayer.init(playaNode, audioPage.window.HTMLAudioElement);

        expect(result).toBe(false);
    });

    it('Init Player - No endpoint', async () => {
        HTML5AudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
            return 'probably';
        });
        HTML5AudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });
        playaNode.removeAttribute('data-setup');

        const initd = await HTML5AudioPlayer.init(playaNode, audioPage.window.HTMLAudioElement);

        expect(initd).toBe(false);
    });

    // it('llmnlkm', async () => {
    //     HTML5AudioPlayer.__Rewire__('#_checkHtml5AudioSupport', () => true);
    //     const playa = new HTML5AudioPlayer(playaNode, HttpClient);
    //     const initd = await playa.init();
    // });
});
