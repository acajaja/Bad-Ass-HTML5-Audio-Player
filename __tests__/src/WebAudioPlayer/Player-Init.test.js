import * as HttpClient from '../../../src/WebAudioPlayer/components/HttpClient';
jest.mock('../../../src/WebAudioPlayer/components/HttpClient.js');

import * as FeatureDetection from '../../../src/WebAudioPlayer/components/FeatureDetection';
jest.mock('../../../src/WebAudioPlayer/components/FeatureDetection.js', () => {
    return {
        __esModule: true,
        checkWebAudioApiSupport: jest.fn()
    }
});

import logger from '../../../src/WebAudioPlayer/components/logger';
jest.mock('../../../src/WebAudioPlayer/components/logger.js', () => {
    return {
        __esModule: true,
        default: {
            critical: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
            log: jest.fn(),
            trace: jest.fn(),
            warn: jest.fn()
        }
    }
});

describe('Web Audio Player Init Tests', () => {
    const path      = require('path');
    const { JSDOM } = require('jsdom');

    let audioPage, playerRoot, WebAudioPlayer;
    let origEnvs = {...process.env};
    let events = {};

    beforeEach(async () => {
        audioPage = await JSDOM.fromFile(path.resolve(__dirname, '../../Stubs/audio-player.html'));
        playerRoot = audioPage.window.document.getElementById('my-boom-box');

        WebAudioPlayer = await import('../../../src/WebAudioPlayer/WebAudioPlayer.js');
        // jest.resetModules();
        jest.resetAllMocks();
    });

    afterEach(() => {
        // restore the original func after test_setUpFunctionality
        process.env = origEnvs;
        events = {};
    });

    it('OK', () => {
        HttpClient.get.mockImplementationOnce(async () => await Promise.resolve([]));
        FeatureDetection.checkWebAudioApiSupport.mockImplementation(() => true);
        audioPage.window.HTMLAudioElement['canPlayType'] = jest.fn(() => 'probably');
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

        const webAudio = WebAudioPlayer.init(playerRoot, audioPage.window, audioPage.window.HTMLAudioElement);

        expect(WebAudioPlayer.version).toBe('0.7');
        expect(webAudio).toBe(audioPage.window.HTMLAudioElement);
        expect(HttpClient.get).toHaveBeenCalledWith('http://127.0.0.1:8081/js/playlists.json');
    });

    it('No Web Audio support', () => {
        FeatureDetection.checkWebAudioApiSupport.mockImplementationOnce(() => false);
        let result;

        expect(() => {
            result = WebAudioPlayer.init(playerRoot, audioPage.window);
        }).toThrow();
        expect(result).toBe(undefined);
    });

    it('No codec support', () => {
        FeatureDetection.checkWebAudioApiSupport.mockImplementationOnce(() => true);
        let result;

        expect(() => {
            result = WebAudioPlayer.init(playerRoot, audioPage.window);
        }).toThrow();
        expect(result).toBe(undefined);
    });

    it('Evenet listener not supported', () => {
        FeatureDetection.checkWebAudioApiSupport.mockImplementationOnce(() => true);
        audioPage.window.HTMLAudioElement.addEventListener = undefined;
        let result;

        expect(() => {
            result = WebAudioPlayer.init(playerRoot, audioPage.window, audioPage.window.HTMLAudioElement);
        }).toThrow();
        expect(result).toBe(undefined);
    });
});
