import { init } from './WebAudioPlayer.js';

window.document.onload = () => {
    init(document.getElementById('my-boom-box'));
}
