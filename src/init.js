import { init } from './WebAudioPlayer.js';

window.onload = (e) => {
    const playerNode = document.getElementById('my-boom-box');
    init(playerNode);
}
