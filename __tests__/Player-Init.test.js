import * as WebAudioPlayer from '../src/WebAudioPlayer/WebAudioPlayer';
import { _checkHtml5AudioSupport, __RewireAPI__ as WebAudioPlayerRewireAPI } from '../src/WebAudioPlayer/WebAudioPlayer';
import * as logger from '../src/WebAudioPlayer/components/logger';
jest.mock('../src/WebAudioPlayer/components/logger.js', () => {
    return {
        __esModule: true,
        critical: jest.fn(msg => {}),
        debug: jest.fn(msg => {}),
        error: jest.fn(msg => {}),
        info: jest.fn(msg => {}),
        log: jest.fn(msg => {}),
        warn: jest.fn(msg => {})
    }
});

describe('Web Audio Player Init Tests', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, playaNode;
    let origEnvs = {...process.env};
    let events = {};

    beforeEach(async () => {
        audioPage = await JSDOM.fromFile(path.resolve(__dirname, 'Stubs/audio-player.html'));
        playaNode = audioPage.window.document.getElementById('my-boom-box');

        // audioPage.window.document.addEventListener = jest.fn((event, callback) => {
        //     events[event] = callback;
        // });

        // audioPage.window.document.removeEventListener = jest.fn((event, callback) => {
        //     delete events[event];
        // });
        // await new Promise((resolve) =>
        //     audioPage.window.addEventListener('load', resolve)
        // );
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        jest.resetModules();
        process.env = origEnvs;
        events = {};
    });

    it('No Audio tag support', async () => {
        const result = await WebAudioPlayer.init(playaNode, audioPage.window.document);

        expect(result).toBe(undefined);
    });

    it('Init player - OK', () => {
        WebAudioPlayerRewireAPI.__Rewire__('_canPlayType', () => {
            return 'probably';
        });
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });
        WebAudioPlayer._getNodeByClass = jest.fn((context, className) => {
            let div = audioPage.window.document.createElement('div');
            div.addEventListener = jest.fn((event, callback) => {
                events[event] = callback;
            });
            div.id = context.id;
            div.classList.add(className);
            return div;
        });
        audioPage.window.HTMLAudioElement.addEventListener = jest.fn((event, callback) => {
            events[event] = callback;
        });

        const webAudio = WebAudioPlayer.init(playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);

        expect(WebAudioPlayer.version).toBe('0.6');
        expect(webAudio).toBe(audioPage.window.HTMLAudioElement);
        // expect(HttpClient).toHaveBeenCalledWith('https://me.local');
        // expect(HttpClient.mock.calls.length).toBe(1);
    });

    it('Init player - No Web Audio support', async () => {
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return false;
        });
        const result = await WebAudioPlayer.init(playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);

        expect(playaNode.classList.contains('paused')).toBe(false);
        expect(logger.error).toHaveBeenCalled();
        expect(result).toBe(undefined);
    });

    it('Init player - No codec support', async () => {
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });
        WebAudioPlayerRewireAPI.__Rewire__('_checkMimeSupport', () => {
            return false;
        });
        const result = await WebAudioPlayer.init(playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);

        expect(playaNode.classList.contains('paused')).toBe(true);
        expect(logger.error).toHaveBeenCalled();
        expect(result).toBe(undefined);
    });


    it('Evenet listener not supported', async () => {
        audioPage.window.HTMLAudioElement.addEventListener = undefined;
        WebAudioPlayerRewireAPI.__Rewire__('_checkWebAudioApiSupport', () => {
            return true;
        });
        WebAudioPlayerRewireAPI.__Rewire__('_checkMimeSupport', () => {
            return true;
        });

        const result = await WebAudioPlayer.init(playaNode, audioPage.window.document, audioPage.window.HTMLAudioElement);

        expect(playaNode.classList.contains('paused')).toBe(true);
        expect(logger.error).toHaveBeenCalled();
        expect(result).toBe(undefined);
    });
});
