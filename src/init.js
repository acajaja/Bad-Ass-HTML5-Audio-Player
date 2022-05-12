import { init } from './WebAudioPlayer.js';

const la = (e) => {
    const playerNode = document.getElementById('my-boom-box');
    init(playerNode);
}

window.document.addEventListener('DOMContentLoaded', la);
