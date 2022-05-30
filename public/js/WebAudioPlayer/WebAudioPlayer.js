import * as HttpClient from './components/HttpClient.js';
import { playlists } from './components/playlists.js';
import * as logger from './components/logger.js';
/**
 * HTML5 JavaScript Audio Player v0.6.
 *
 * Designed to play any supported audio type.
 *
 * @copyright © 2013,2022 Clif Jackson
 * @package HTML5 JavaScript Audio Player
 * @version 0.6
 */
export const version		= '0.6';
 
let _DOC;
let _AUDIO_CODECS_MIMES     = {
	mp3: ['audio/mpeg', 'audio/MPA', 'audio/mpa-robust','audio/mpeg3','audio/x-mpeg-3'],
	mp4: ['audio/aac', 'audio/aacp', 'audio/3gpp', 'audio/3gpp2', 'audio/mp4', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
	ogg: ['application/ogg', 'audio/oga', 'audio/ogg', 'audio/vorbis', 'audio/vorbis-config'],
	webm: ['audio/webm'],
	wav: ['audio/vnd.wave', 'audio/wav', 'audio/wave', 'audio/x-wav']
};
let _WEB_AUDIO 				= null;
let _AUTO_PLAY				= false;
let _CURRENT_TRACK      	= null;
let _HTML5_SUPPORT			= false;
let _PLAYERROOT				= null;
let _PLAYER_CONTROL_NODES	= [];
let _PLAYLIST               = null;
let _TRACK_COUNT			= 0;
let _SAVEDVOLUME			= 0;
let _PLAYER_PARTS_SELECTORS = {
	ajaxSpinner: '.net-stat-box',
	autoplayBtn: '.autoplay-btn',
	currentTimeDisplay: '.current-time',
	infoButton: '.info-button',
	infoScreen: '.info-screen',
	infoScroll: '.info-scroll-box',
	infoScrollContent: '.info-content-box',
	loadProgress: '.loading-bar',
	muteButton: '.mute-button',
	nextTrackBtn: '.next-track-btn',
	playBtn: '.play-btn',
	playlistBox: '.playlist-scroll-box',
	playlistBtn: '.playlist-btn',
	prevTrackBtn: '.prev-track-btn',
	remainingTime: '.remaining-time',
	seekHandleBox: '.seek-handle-box',
	screenTitle: '.screen-title',
	userScreen: '.user-screen',
	volumeSliderMute: '.volume-slider-mute-box',
	volumeButton: '.volume-button',
	volumeSlider: '.volume-slider'
}
let _PLAYER_FUNCS			= {
    ajaxSpinner: {},
    autoplayBtn: {},
    currentTimeDisplay: null,
    infoButton: {},
    infoScreen: {},
    infoScroll: null,
    infoScrollContent: null,
    loadProgress: {},
    muteButton: {},
    nextTrackBtn: {},
    playBtn: {},
    playlistBox: null,
    playlistBtn: {},
    prevTrackBtn: {},
    remainingTime: null,
    seekHandleBox: {},
    screenTitle: null,
    userScreen: {},
    volumeButton: {},
    volumeSliderMute: {},
    volumeSlider: {}
}

/**
 * Public Methods
 ---------------------------------------------------------------------*/

 /**
  * Startup an instance of a player by passing in an id. This
  * is meant to be used in production environments.
  *
  * @param {String} id DOM node id attribute for your player.
  * @returns {HTMLWebAudioElement}
  */
/* istanbul ignore next */
export const startup = (id) => {
	let audio;
	const cb = (e) => {
		const playerNode = window.document.getElementById(id);
		audio = init(playerNode, window.document);
	}
	window.document.addEventListener('DOMContentLoaded', cb);

	return audio;
}

/**
 * Initialize the player
 *
 * @return {HTMLWebAudioElement}
 */
 export const init = (playerNode, doc, audio = null) => {
	_PLAYERROOT	   = playerNode;
	_DOC		   = doc;
	_HTML5_SUPPORT = _checkWebAudioApiSupport();

	try {
		if (!_HTML5_SUPPORT) {
			throw new Error('Web Audio is not supported on your device :(');
		}

		_PLAYERROOT.classList.add('paused');
		_setAudioObject(audio);

        if (!_checkMimeSupport()) {
            throw new Error('There is no audio codec supported for this device.');
        }

		_setUpFunctionality();
		_PLAYER_CONTROL_NODES = [
			_PLAYER_FUNCS.autoplayBtn.node,
			_PLAYER_FUNCS.playBtn.node,
			_PLAYER_FUNCS.prevTrackBtn.node,
			_PLAYER_FUNCS.muteButton.node,
			_PLAYER_FUNCS.nextTrackBtn.node,
			_PLAYER_FUNCS.seekHandleBox.node,
			_PLAYER_FUNCS.volumeSlider.node
		];
		_togglePlayerButtons(true);

        // Initialize volume
		_PLAYER_FUNCS.volumeSlider.setPosition(1);
		// Initialize audio seek position
        _PLAYER_FUNCS.seekHandleBox.setPosition(0);
		// Disable the info button until something is loaded
		_PLAYER_FUNCS.infoButton.disable(true);

		_connectPlayerButtons();
		_connectAudioEvents();
		_renderPlaylistsList();

		return _WEB_AUDIO;
	}
	catch (err) {
		logger.error('Failed to initiate the Web Audio Player :(');
	}
}

/**
 * Private Methods
 ---------------------------------------------------------------------*/

/**
 * Convenience function.
 *
 * @param {String} className
 * @returns {object} DOMNode|null
 */
function _getNodeByClass(className) {
    return _DOC.querySelector(`#${_PLAYERROOT.id} ${className}`);
}

/**
 * 
 * @param {Boolean} state 
 */
function ajaxSpinnerToggler(state) {
	if (state) {
		_PLAYER_FUNCS.ajaxSpinner.node.classList.add('play');
	}
	else {
		_PLAYER_FUNCS.ajaxSpinner.node.classList.remove('play');
	}
}

/**
 * 
 * @param {DOM Event} e 
 */
function autoPlayButtonHandler(e) {
	if (!_AUTO_PLAY) {
		_AUTO_PLAY = true;
		_PLAYERROOT.classList.add('autoplay');
	}
	else {
		_AUTO_PLAY = false;
		_PLAYERROOT.classList.remove('autoplay');
	}
}

/**
 * 
 * @param {Boolean} state 
 */
function infoButtonHandler(state) {
	if (state) {
		_PLAYER_FUNCS.infoButton.node.classList.remove('has-info');
		_PLAYER_FUNCS.infoButton.node.disabled = true;
	}
	else {
		_PLAYER_FUNCS.infoButton.node.classList.add('has-info');
		_PLAYER_FUNCS.infoButton.node.disabled = false;
	}
}

/**
 * 
 * @param {Boolean} fast 
 */
function infoScreenCloseHandler(fast) {
	if (fast) {
		_PLAYER_FUNCS.infoScreen.node.classList.add('fast');
		setTimeout(function() {
			_PLAYER_FUNCS.infoScreen.node.classList.remove('fast');
		}, 500);
	}
	_PLAYER_FUNCS.infoScreen.node.classList.remove('play');
}

/**
 * 
 */
function infoScreenOpenHandler() {
	_PLAYER_FUNCS.infoScreen.node.classList.add('play');
}

/**
 * 
 * @param {DOM Event} e 
 */
function infoScreenToggler(e) {
	if (_PLAYER_FUNCS.infoScreen.node.classList.contains('play')) {
		_PLAYER_FUNCS.infoScreen.close();
		// classList.remove('active');
	}
	else {
		_PLAYER_FUNCS.infoScreen.open();
		// classList.add('active');
	}
}

/**
 * Define all the functionality the player UI needs.
 */
function _setUpFunctionality() {
	_PLAYER_FUNCS.ajaxSpinner = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.ajaxSpinner),
		toggle: ajaxSpinnerToggler
	}
	_PLAYER_FUNCS.autoplayBtn = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.autoplayBtn),
		handleButton: autoPlayButtonHandler
	}
	_PLAYER_FUNCS.currentTimeDisplay = _getNodeByClass(_PLAYER_PARTS_SELECTORS.currentTimeDisplay);
	_PLAYER_FUNCS.infoButton = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.infoButton),
		disable: infoButtonHandler
	}
	_PLAYER_FUNCS.infoScreen = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.infoScreen),
		close: infoScreenCloseHandler,
		open: infoScreenOpenHandler,
		toggle: infoScreenToggler
	}
	_PLAYER_FUNCS.infoScroll = _getNodeByClass(_PLAYER_PARTS_SELECTORS.infoScroll);
	_PLAYER_FUNCS.infoScrollContent = _getNodeByClass(_PLAYER_PARTS_SELECTORS.infoScrollContent);
	_PLAYER_FUNCS.loadProgress = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.loadProgress),
		reset: function() {
			this.setWidth('0');
		},
		setFullWidth: function(e) {
			this.setWidth('100%');
		},
		setWidth: function(w) {
			_PLAYER_FUNCS.loadProgress.node.style.width = w;
		}
	}
	_PLAYER_FUNCS.muteButton = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.muteButton)
	}
	_PLAYER_FUNCS.nextTrackBtn = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.nextTrackBtn),
		handleButton: function(e) {
			_removePlayingClassFromAll();
			_loadTrack(_getNextTrack());
		}
	}
	_PLAYER_FUNCS.playBtn = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.playBtn),
		handleButton: async function(e) {
			// For the very first play after page load
			if (_WEB_AUDIO.paused && _CURRENT_TRACK == null) {
				_CURRENT_TRACK = 0;
				_loadTrack(_CURRENT_TRACK);
			}
			else if (_WEB_AUDIO.paused) {
				await _play(e);                    
			}
			else {
				_pause(e);
			}
		}
	}
	_PLAYER_FUNCS.playlistBox = _getNodeByClass(_PLAYER_PARTS_SELECTORS.playlistBox);
	_PLAYER_FUNCS.playlistBtn = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.playlistBtn),
		handleButton: _loadAllPlaylistsHandler
	}
	_PLAYER_FUNCS.prevTrackBtn = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.prevTrackBtn),
		handleSingleClick: function(e) {
			_WEB_AUDIO.currentTime = 0;
		},
		handleDblClick: function(e) {
			_removePlayingClassFromAll();
			_loadTrack(_getPrevTrack());
		}
	}
	_PLAYER_FUNCS.remainingTime = _getNodeByClass(_PLAYER_PARTS_SELECTORS.remainingTime);
	_PLAYER_FUNCS.seekHandleBox = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.seekHandleBox),
		handleInput: function(e) {
			_WEB_AUDIO.currentTime = e.target.value;
		},
		reset: function() {
			this.node.value = 0;
			this.toggleEnable(true);
		},
		setMax: function() {
			this.node.setAttribute('max', _WEB_AUDIO.seekable.end(0));
		},
		setPosition: function(val) {
			this.node.value = val;
		},
		toggleEnable: function(status) {
			this.node.disabled = status;
		}
	}
	_PLAYER_FUNCS.screenTitle = _getNodeByClass(_PLAYER_PARTS_SELECTORS.screenTitle);
	_PLAYER_FUNCS.userScreen = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.userScreen),
		reset: function() {
			_PLAYER_FUNCS.seekHandleBox.reset();
			_PLAYER_FUNCS.infoScreen.close(true);
			_PLAYER_FUNCS.loadProgress.reset();
			_populateTimeDisplay('00:00', '00:00');
		}
	}
	_PLAYER_FUNCS.volumeButton = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.volumeButton),
		toggleActive: function() {
			_PLAYER_FUNCS.volumeButton.node.classList.toggle('active');
		},
		toggleMute: function(e) {
			// Unmute
			if (_WEB_AUDIO.muted) {
				_WEB_AUDIO.muted = false;
				_PLAYER_FUNCS.volumeSlider.setPosition(_SAVEDVOLUME);
				_PLAYERROOT.classList.remove('muted');
			}
			// Mute
			else {
				_SAVEDVOLUME = _WEB_AUDIO.volume;
				_WEB_AUDIO.muted = true;
				_PLAYER_FUNCS.volumeSlider.setPosition(0);
				_PLAYERROOT.classList.add('muted');
			}
		}
	}
	_PLAYER_FUNCS.volumeSliderMute = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.volumeSliderMute),
		close: function() {
			_PLAYER_FUNCS.volumeButton.toggleActive();
			_PLAYER_FUNCS.volumeSliderMute.node.classList.remove('play');
		},
		open: function() {
			_PLAYER_FUNCS.volumeButton.toggleActive();
			_PLAYER_FUNCS.volumeSliderMute.node.classList.add('play');
		},
		toggle: function(e) {
			if (_PLAYER_FUNCS.volumeSliderMute.node.classList.contains('play')) {
				_PLAYER_FUNCS.volumeSliderMute.close();
			}
			else {
				_PLAYER_FUNCS.volumeSliderMute.open();
			}
		}
	}
	/* istanbul ignore next */
	_PLAYER_FUNCS.volumeSlider = {
		node: _getNodeByClass(_PLAYER_PARTS_SELECTORS.volumeSlider),
		handleInput: function(e) {
			_WEB_AUDIO.volume = e.target.value;
		},
		setPosition: function(v) {
			const vol = parseInt(v);
			_PLAYER_FUNCS.volumeSlider.node.value = vol > 1 ? 1 : vol;
		}
	}
}

/**
 * Handle clicks on the playlists button.
 *
 * @param {DOM Event} e 
 */
/* istanbul ignore next */
function _loadAllPlaylistsHandler(e) {
	_togglePlayerButtons(true);

	if (!_WEB_AUDIO.paused) {
		_pause();
	}

	// Reset doesn't work unless we wait.
	setTimeout(function() {
		_PLAYER_FUNCS.volumeSliderMute.close();
		_PLAYER_FUNCS.userScreen.reset();
		_renderPlaylistsList();
	}, 100);
}

/**
 * Comvenience method for attaching event handlers to DOM node.
 *
 * @param {DOM Node} node DOM Node to attach event to.
 * @param {String} event DOM event to attach to.
 * @param {Function} handler Callback function.
 * @returns {Void}
 */
function _attachEvents(node, event, handler) {
	if (typeof node.addEventListener != 'function') {
		throw new Error('Cannot attach events. Client does not support addEventListener method.');
	}
	node.addEventListener(event, handler, false);
}

/**
 * Determine if the browser can play the given mime type.
 *
 * @param {String} type 
 * @returns 
 */
/* istanbul ignore next */
function _canPlayType(type) {
	return _WEB_AUDIO.canPlayType(type);
}

/**
 * Check if the browser supprts the Web Audio element.
 *
 * @returns {Boolean} true if supported, false otherwise.
 */
function _checkWebAudioApiSupport() {
	const type = typeof Audio;
	return (type == 'function' || type == 'object');
}

/**
 * Connect player buttons
 *
 * @returns {Void}
 */
 function _connectPlayerButtons() {
	_attachEvents(_PLAYER_FUNCS.autoplayBtn.node, 'click', _PLAYER_FUNCS.autoplayBtn.handleButton);
	_attachEvents(_PLAYER_FUNCS.infoButton.node, 'click', _PLAYER_FUNCS.infoScreen.toggle);
	_attachEvents(_PLAYER_FUNCS.nextTrackBtn.node, 'click', _PLAYER_FUNCS.nextTrackBtn.handleButton);
	_attachEvents(_PLAYER_FUNCS.playBtn.node, 'click', _PLAYER_FUNCS.playBtn.handleButton);
	_attachEvents(_PLAYER_FUNCS.playlistBtn.node, 'click', _PLAYER_FUNCS.playlistBtn.handleButton);
	_attachEvents(_PLAYER_FUNCS.prevTrackBtn.node, 'click', _PLAYER_FUNCS.prevTrackBtn.handleSingleClick);
	_attachEvents(_PLAYER_FUNCS.prevTrackBtn.node, 'dblclick', _PLAYER_FUNCS.prevTrackBtn.handleDblClick);
	_attachEvents(_PLAYER_FUNCS.seekHandleBox.node, 'input', _PLAYER_FUNCS.seekHandleBox.handleInput);
	_attachEvents(_PLAYER_FUNCS.muteButton.node, 'click', _PLAYER_FUNCS.volumeButton.toggleMute);
    _attachEvents(_PLAYER_FUNCS.volumeButton.node, 'click', _PLAYER_FUNCS.volumeSliderMute.toggle);
	_attachEvents(_PLAYER_FUNCS.volumeSlider.node, 'input', _PLAYER_FUNCS.volumeSlider.handleInput);
}

/**
 * Determine the supported mime type.
 * 
 * @param {Array} types List of mime types
 * @returns {Boolean|String} If not false, returns the audio mime.
 */
/* istanbul ignore next */
function _checkMimeSupport() {
	var ans = '';

	for (let x in _AUDIO_CODECS_MIMES) {
        for (let xx in _AUDIO_CODECS_MIMES[x]) {
            ans = _canPlayType(_AUDIO_CODECS_MIMES[x][xx]);

            if (ans === 'probably' || ans === 'maybe') {
                return x;
            }
        }
	}

	return false;
}

/**
 * Connect to the HTML5 media events
 *
 * @return {Void}
 */
function _connectAudioEvents() {
	_attachEvents(_WEB_AUDIO, 'canplay', _play);
	_attachEvents(_WEB_AUDIO, 'ended', _handleEndOfAudioEvent);
	_attachEvents(_WEB_AUDIO, 'loadeddata', _PLAYER_FUNCS.loadProgress.setFullWidth);
	_attachEvents(_WEB_AUDIO, 'pause', _handlePauseEvent);
	_attachEvents(_WEB_AUDIO, 'playing', _handlePlayingEvent);
	_attachEvents(_WEB_AUDIO, 'progress', _handleProgressEvent);
	_attachEvents(_WEB_AUDIO, 'timeupdate', _handleTimeUpdateEvent);
}

/**
 * Convert seconds to mins:secs format
 *
 * @param {Number} s Current play time in seconds
 * @param {Boolean} rev Reverse the time
 * @returns {String}
 */
function _convertSecondsToTime(s, rev) {
	if (rev === true) {
		var mins = Math.floor(s / 60, 10),
		secs = s - mins * 60,
		time = (mins > 9 ? mins : '0' + mins) + ':' + (secs > 9 ? secs : '0' + secs);

		return time;
	}

	var sec_num = parseInt(s, 10),
	hours   = Math.floor(sec_num / 3600),
	minutes = Math.floor((sec_num - (hours * 3600)) / 60),
	seconds = sec_num - (hours * 3600) - (minutes * 60),
	time = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

	return time;
}

/**
 * 
 * @param {String} str
 * @returns {Text}
 */
function _createTextNode(str) {
	return _DOC.createTextNode(str);
}

/**
 * 
 * @param {type} node
 * @returns {Void}
 */
function _empty(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}

	return node;
}

/**
 * The next track or the first track
 *
 * @return {Number} New track number
 */
function _getNextTrack() {
	var hypoNext = _CURRENT_TRACK + 1;

	if (hypoNext < _TRACK_COUNT) {
        return hypoNext;
    }

	return 0;
}

/**
 * The previous track or the last track
 *
 * @return {Number} New track number
 */
function _getPrevTrack() {
	if (_CURRENT_TRACK > 0) {
        return (_CURRENT_TRACK - 1);
    }

	return (_TRACK_COUNT - 1);
}

/**
 * Load the playlist with an optional playlist path
 *
 * @param {String} pl Path to load playlist from via AJAX
 * @return {JSON}
 */
 async function _loadPlaylist(pl) {
	if (typeof pl != 'string' || pl.length <= 0) {
		throw new Error('No playlist has been defined!');
	}

	_PLAYER_FUNCS.ajaxSpinner.toggle(true);
	_togglePlayerButtons(true);
	_PLAYER_FUNCS.playlistBtn.node.classList.remove('active');

	return await HttpClient.get(pl);
}

/**
 * Handle clicks on a single playlist.
 *
 * @param {DOM Event} e
 * @returns {Promise}
 */
async function _playlistButtonHandler(e) {
	const plu = e.target.dataset.playlist;
	e.preventDefault();

	try {
		const playlistUrl = new URL(plu);
		const pl = await _loadPlaylist(playlistUrl.href);
		_handlePlaylist(pl);
	}
	catch (ex) {
		console.error('Failed to load playlist');
	}
}

/**
 * Handle a playlist after it loads.
 *
 * @param {Object} JSON Playlist.
 * @returns {Void}
 */
 function _handlePlaylist(pl) {
	// pl = JSON.parse(JSON.stringify(pl));

	_togglePlayerButtons(false);

	_PLAYLIST = pl;
	_updateScreenTitle(_PLAYLIST.name);
	_TRACK_COUNT = _PLAYLIST.tracks.length;
	_setUpPlaylistDisplay();
	_populateTimeDisplay('00:00', '00:00');

	const content = pl.info ? `<p>${pl.info}</p>` : '';
	_populateInfoBoxContent(content);
}

/**
 * Render the playlists defined and imported in
 * 'playlists' named import into _PLAYER_FUNCS.playlistBox.
 *
 * @returns {Void}
 */
function _renderPlaylistsList() {
	if (typeof playlists == 'undefined' || playlists == null || playlists.length <= 0) {
		throw new Error('No playlists found! See ./components/playlists.js');
	}

    _PLAYER_FUNCS.playlistBtn.node.classList.add('active');
	_updateScreenTitle('Playlists');
	_empty(_PLAYER_FUNCS.playlistBox);

	for (const playlist of playlists) {
		const button = _DOC.createElement('button');
		const li = _DOC.createElement('li');

		button.appendChild(_createTextNode(playlist.name));
		button.dataset.playlist = playlist.url;
		button.setAttribute('title', playlist.name);
		_attachEvents(button, 'click', _playlistButtonHandler);
		li.appendChild(button);
		_PLAYER_FUNCS.playlistBox.appendChild(li);
	}
}

/**
 * Event handler for end.
 *
 * @param {Object} e Event object
 * @returns {Void}
 */
function _handleEndOfAudioEvent(e) {
	if (_AUTO_PLAY) {
		_removePlayingClassFromAll();
		_loadTrack(_getNextTrack());
	}
}

/**
 * Event handler for pause.
 *
 * @param {Object} e Event object
 * @returns {Void}
 */
function _handlePauseEvent(e) {
	_PLAYERROOT.classList.remove('playing');
	_PLAYERROOT.classList.add('paused');
}

/**
 * Event handler for AJAX response.
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */
function _handlePlayingEvent(e) {
	var parent = _PLAYER_FUNCS
		.playlistBox
		.querySelector(`button[data-tracknum="${_CURRENT_TRACK}"]`)
		.parentNode;

	_PLAYERROOT.classList.remove('paused');
	_PLAYERROOT.classList.add('playing');
	parent.setAttribute('class', 'current');
}

/**
 * Event handler for _WEB_AUDIO loading progress.
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */
function _handleProgressEvent(e) {
	const buffd = e.target.buffered;
	for (let i = 0; i < buffd.length; i++) {
		const percentage = Math.ceil(parseInt((buffd.end(i) / buffd.duration) * 100));
		_PLAYER_FUNCS.loadProgress.setWidth(percentage + '%');
	}
}

/**
 * Event handler for _WEB_AUDIO time update.
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */
function _handleTimeUpdateEvent(e) {
	// Calculate & set play time display counting backwards
	const dur = e.target.duration;
	const time = e.target.currentTime;
	const totalSecondsRemaining = parseInt(dur - time, 10);

	if (isNaN(totalSecondsRemaining)) {
		return;
	}

	_populateTimeDisplay(_convertSecondsToTime(time), _convertSecondsToTime(totalSecondsRemaining, true));

	// Set new seek handle position
	_PLAYER_FUNCS.seekHandleBox.setPosition(time);
}

function _populateInfoBoxContent(content) {
	_empty(_PLAYER_FUNCS.infoScrollContent);

	_PLAYER_FUNCS.infoScrollContent.innerHTML = content;
	_PLAYER_FUNCS.infoButton.disable(false);
}

/**
 * Load the current track and any info
 *
 * @param {Number} ct The current track number using a 0-based index.
 * @return {Void}
 */
function _loadTrack(ct) {
	_pause();
	_PLAYER_FUNCS.seekHandleBox.toggleEnable(true);
	_PLAYER_FUNCS.loadProgress.reset();
	_CURRENT_TRACK = parseInt(ct);
	_WEB_AUDIO.src = _PLAYLIST.tracks[_CURRENT_TRACK].path;

	// Enable track info button if track has info
	if (_PLAYLIST.tracks[_CURRENT_TRACK].info.length <= 0) {
		_PLAYER_FUNCS.infoButton.disable(true);
	}
	else {
		const content = `<p>${_PLAYLIST.tracks[_CURRENT_TRACK].title}</p>
			${_PLAYLIST.tracks[_CURRENT_TRACK].info}`;
		_populateInfoBoxContent(content);
	}

	_WEB_AUDIO.load();
}

/**
 * Pause handler
 *
 * @param {Object} e Event object
 * @returns {Void}
 */
function _pause(e) {
	_WEB_AUDIO.pause();
}

/**
 * Play handler for _WEB_AUDIO
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */
async function _play(e) {
	_PLAYER_FUNCS.seekHandleBox.toggleEnable(false);
	_PLAYER_FUNCS.seekHandleBox.setMax();

	try {
		await _WEB_AUDIO.play();
	}
	catch (ex) {
		_PLAYER_FUNCS.seekHandleBox.toggleEnable(true);
	}
}

/**
 * Set the time displays
 *
 * @param {Number} current
 * @param {Number} remain
 * @returns {Void}
 */
function _populateTimeDisplay(current, remain) {
	_empty(_PLAYER_FUNCS.remainingTime)
		.appendChild(_createTextNode(remain));
	_empty(_PLAYER_FUNCS.currentTimeDisplay)
		.appendChild(_createTextNode(current));
}

/**
 * Set all tracks in display list to NOT active by removing the class
 *
 * @return {Void}
 */
function _removePlayingClassFromAll() {
	_PLAYERROOT.classList.remove('playing');
	const current = _PLAYER_FUNCS.playlistBox.querySelector('current');

	if (current) {
		current.removeAttribute('class');
	}
}

/**
 * Create a new Web Audio element if one is not passed in.
 *
 * @param {Audio Element} audio; defaults to null.
 */
function _setAudioObject(audio = null) {
	_WEB_AUDIO = audio ?? new Audio();
}

/**
 * Load track button handler.
 *
 * @param {DOM Event} e 
 */
function _handleLoadTrack(e) {
	const trackNum = parseInt(e.target.getAttribute('data-tracknum'));
	e.preventDefault();
	_removePlayingClassFromAll();
	_loadTrack(trackNum);
}

/**
 * Initialize the playlist display and connect to button click event
 *
 * @return {Void}
 */
function _setUpPlaylistDisplay() {
	// Clear list contents
	_empty(_PLAYER_FUNCS.playlistBox);

	for (let x = 0; x < _PLAYLIST.tracks.length; x++) {
		const track = _PLAYLIST.tracks[x];
		const li = _DOC.createElement('li');
		const shortText = _makeShortTitle(track.title);

		// Create a new button node & dress it up.
		const btn = _DOC.createElement('button');
		btn.appendChild(_createTextNode(shortText));
		btn.setAttribute('data-tracknum', x);
		// Add to list item
		li.appendChild(btn);
		// Add to list
		_PLAYER_FUNCS.playlistBox.appendChild(li);
		// Add event handler
		_attachEvents(btn, 'click', _handleLoadTrack);
	}
}

/**
 * Create shortened title
 *
 * @return {String} Shortened title
 */
/* istanbul ignore next */
function _makeShortTitle(titleStr) {
	const cutoff = 50;

	if (titleStr.length <= cutoff) {
		return titleStr;
	}

	const cut = titleStr.substr(0, cutoff);
	const split = cut.split(' ');
	const pop = split.pop();

	return `${split.join(' ')}...`;
}

/**
 * Enable/disable all player buttons
 *
 * @param {Boolean} state
 * @returns {Void}
 */
function _togglePlayerButtons(state) {
	for (const node of _PLAYER_CONTROL_NODES) {
		node.disabled = state;
	}
}

/**
 * Set the title text
 *
 * @param {String} str New title
 * @returns {Void}
 */
function _updateScreenTitle(str) {
	_PLAYER_FUNCS.screenTitle.innerHTML = str;
}
