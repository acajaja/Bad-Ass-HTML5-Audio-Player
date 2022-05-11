/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/WebAudioPlayer.js":
/*!*******************************!*\
  !*** ./src/WebAudioPlayer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__GetDependency__": () => (/* binding */ _get__),
/* harmony export */   "__ResetDependency__": () => (/* binding */ _reset__),
/* harmony export */   "__RewireAPI__": () => (/* binding */ _RewireAPI__),
/* harmony export */   "__Rewire__": () => (/* binding */ _set__),
/* harmony export */   "__get__": () => (/* binding */ _get__),
/* harmony export */   "__set__": () => (/* binding */ _set__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _components_HttpClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/HttpClient.js */ "./src/components/HttpClient.js");
/* harmony import */ var _components_playlists_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/playlists.js */ "./src/components/playlists.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/**
 * HTML5 JavaScript Audio Player v0.6.
 *
 * Designed to play any supported audio type.
 *
 * @copyright © 2013,2022 Clif Jackson
 * @package HTML5 JavaScript Audio Player
 * @version 0.6
 */

var _AUDIO_CODECS_MIMES = {
  mp3: ['audio/mpeg', 'audio/MPA', 'audio/mpa-robust', 'audio/mpeg3', 'audio/x-mpeg-3'],
  mp4: ['audio/aac', 'audio/aacp', 'audio/3gpp', 'audio/3gpp2', 'audio/mp4', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
  ogg: ['application/ogg', 'audio/oga', 'audio/ogg', 'audio/vorbis', 'audio/vorbis-config'],
  webm: ['audio/webm'],
  wav: ['audio/vnd.wave', 'audio/wav', 'audio/wave', 'audio/x-wav']
};
var _WEB_AUDIO = null;
var _AUTO_PLAY = false;
var _CURRENT_TRACK = null;
var _HTML5_SUPPORT = false;
var _PLAYERROOT = null;
var _PLAYER_CONTROL_NODES = [];
var _PLAYLIST = null;
var _TRACK_COUNT = 0;
var _SAVEDVOLUME = 0;
var _PLAYER_PARTS_SELECTORS = {
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
};
var _PLAYER_FUNCS = {
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
};
var version = '0.6';
/**
 * Public Methods
 ---------------------------------------------------------------------*/

/**
 * Initialize the player
 *
 * @return {Boolean} false on error
 */

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(player) {
    var audio,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            audio = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;

            _assign__("_PLAYERROOT", player);

            _assign__("_HTML5_SUPPORT", _get__("_checkWebAudioApiSupport")());

            _context.prev = 3;

            if (_get__("_HTML5_SUPPORT")) {
              _context.next = 6;
              break;
            }

            throw new Error('Web Audio is not supported on your device :(');

          case 6:
            _get__("_PLAYERROOT").classList.add('paused');

            _get__("_setAudioObject")(audio);

            if (_get__("_checkMimeSupport")()) {
              _context.next = 10;
              break;
            }

            throw new Error('There is no audio codec supported for this device.');

          case 10:
            _get__("_setUpFunctionality")(player);

            _assign__("_PLAYER_CONTROL_NODES", [_get__("_PLAYER_FUNCS").autoplayBtn.node, _get__("_PLAYER_FUNCS").playBtn.node, _get__("_PLAYER_FUNCS").prevTrackBtn.node, _get__("_PLAYER_FUNCS").muteButton.node, _get__("_PLAYER_FUNCS").nextTrackBtn.node, _get__("_PLAYER_FUNCS").seekHandleBox.node, _get__("_PLAYER_FUNCS").volumeSlider.node]);

            _get__("_togglePlayerButtons")(true); // Initialize volume


            _get__("_PLAYER_FUNCS").volumeSlider.setPosition(1); // Initialize audio seek position


            _get__("_PLAYER_FUNCS").seekHandleBox.setPosition(0); // Disable the info button until something is loaded


            _get__("_PLAYER_FUNCS").infoButton.disable(true);

            _get__("_connectPlayerButtons")();

            _get__("_connectAudioEvents")();

            _get__("_handleAllPlaylists")();

            return _context.abrupt("return", true);

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);
            return _context.abrupt("return", false);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 22]]);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Private Methods
 ---------------------------------------------------------------------*/

/**
 * Convenience function.
 *
 * @param {DOM Node} context Player root dom node.
 * @param {String} className
 * @returns {object} DOMNode|null
 */

function getNodeByClass(context, className) {
  return document.querySelector("#".concat(context.id, " ").concat(className));
}
/**
 * Define all the functionality the player UI needs.
 *
 * @param {String} context CSS selector for the player instance.
 * @param {Web Audio Element} _WEB_AUDIO Web Audio instance.
 */


function _setUpFunctionality(context) {
  _get__("_PLAYER_FUNCS").ajaxSpinner = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").ajaxSpinner),
    toggle: function toggle(state) {
      if (state) {
        _get__("_PLAYER_FUNCS").ajaxSpinner.node.classList.add('play');
      } else {
        _get__("_PLAYER_FUNCS").ajaxSpinner.node.classList.remove('play');
      }
    }
  };
  _get__("_PLAYER_FUNCS").autoplayBtn = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").autoplayBtn),
    handleButton: function handleButton(e) {
      if (!_get__("_AUTO_PLAY")) {
        _assign__("_AUTO_PLAY", true);

        context.classList.add('autoplay');
      } else {
        _assign__("_AUTO_PLAY", false);

        context.classList.remove('autoplay');
      }
    }
  };
  _get__("_PLAYER_FUNCS").currentTimeDisplay = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").currentTimeDisplay);
  _get__("_PLAYER_FUNCS").infoButton = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").infoButton),
    disable: function disable(state) {
      if (state) {
        _get__("_PLAYER_FUNCS").infoButton.node.classList.remove('has-info');

        _get__("_PLAYER_FUNCS").infoButton.node.disabled = true;
      } else {
        _get__("_PLAYER_FUNCS").infoButton.node.classList.add('has-info');

        _get__("_PLAYER_FUNCS").infoButton.node.disabled = false;
      }
    }
  };
  _get__("_PLAYER_FUNCS").infoScreen = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").infoScreen),
    close: function close(fast) {
      if (fast) {
        _get__("_PLAYER_FUNCS").infoScreen.node.classList.add('fast');

        setTimeout(function () {
          _get__("_PLAYER_FUNCS").infoScreen.node.classList.remove('fast');
        }, 500);
      }

      _get__("_PLAYER_FUNCS").infoScreen.node.classList.remove('play');
    },
    open: function open() {
      _get__("_PLAYER_FUNCS").infoScreen.node.classList.add('play');
    },
    toggle: function toggle(e) {
      if (_get__("_PLAYER_FUNCS").infoScreen.node.classList.contains('play')) {
        _get__("_PLAYER_FUNCS").infoScreen.close(); // classList.remove('active');

      } else {
        _get__("_PLAYER_FUNCS").infoScreen.open(); // classList.add('active');

      }
    }
  };
  _get__("_PLAYER_FUNCS").infoScroll = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").infoScroll);
  _get__("_PLAYER_FUNCS").infoScrollContent = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").infoScrollContent);
  _get__("_PLAYER_FUNCS").loadProgress = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").loadProgress),
    reset: function reset() {
      _get__("_PLAYER_FUNCS").loadProgress.setWidth('0');
    },
    setFullWidth: function setFullWidth(e) {
      _get__("_PLAYER_FUNCS").loadProgress.setWidth('100%');
    },
    setWidth: function setWidth(w) {
      _get__("_PLAYER_FUNCS").loadProgress.node.style.width = w;
    }
  };
  _get__("_PLAYER_FUNCS").muteButton = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").muteButton)
  };
  _get__("_PLAYER_FUNCS").nextTrackBtn = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").nextTrackBtn),
    handleButton: function handleButton(e) {
      _get__("_removePlayingClassFromAll")();

      _get__("_loadTrack")(_get__("_getNextTrack")());
    }
  };
  _get__("_PLAYER_FUNCS").playBtn = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").playBtn),
    handleButton: function handleButton(e) {
      // For the very first play after page load
      if (_get__("_WEB_AUDIO").paused && _get__("_CURRENT_TRACK") == null) {
        _assign__("_CURRENT_TRACK", 0);

        _get__("_loadTrack")(_get__("_CURRENT_TRACK"));
      } else if (_get__("_WEB_AUDIO").paused) {
        _get__("_play")(e);
      } else {
        _get__("_pause")(e);
      }
    }
  };
  _get__("_PLAYER_FUNCS").playlistBox = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").playlistBox);
  _get__("_PLAYER_FUNCS").playlistBtn = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").playlistBtn),
    handleButton: _get__("_loadAllPlaylistsHandler")
  };
  _get__("_PLAYER_FUNCS").prevTrackBtn = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").prevTrackBtn),
    handleSingleClick: function handleSingleClick(e) {
      _get__("_WEB_AUDIO").currentTime = 0;
    },
    handleDblClick: function handleDblClick(e) {
      _get__("_removePlayingClassFromAll")();

      _get__("_loadTrack")(_get__("_getPrevTrack")());
    }
  };
  _get__("_PLAYER_FUNCS").remainingTime = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").remainingTime);
  _get__("_PLAYER_FUNCS").seekHandleBox = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").seekHandleBox),
    handleInput: function handleInput(e) {
      _get__("_WEB_AUDIO").currentTime = e.target.value;
    },
    reset: function reset() {
      _get__("_PLAYER_FUNCS").seekHandleBox.node.value = 0;

      _get__("_PLAYER_FUNCS").seekHandleBox.toggleEnable(true);
    },
    setMax: function setMax() {
      _get__("_PLAYER_FUNCS").seekHandleBox.node.setAttribute('max', _get__("_WEB_AUDIO").seekable.end(0));
    },
    setPosition: function setPosition(val) {
      _get__("_PLAYER_FUNCS").seekHandleBox.node.value = val;
    },
    toggleEnable: function toggleEnable(status) {
      _get__("_PLAYER_FUNCS").seekHandleBox.node.disabled = status;
    }
  };
  _get__("_PLAYER_FUNCS").screenTitle = _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").screenTitle);
  _get__("_PLAYER_FUNCS").userScreen = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").userScreen),
    reset: function reset() {
      _get__("_PLAYER_FUNCS").seekHandleBox.reset();

      _get__("_PLAYER_FUNCS").infoScreen.close(true);

      _get__("_PLAYER_FUNCS").loadProgress.reset();

      _get__("_populateTimeDisplay")('00:00', '00:00');
    }
  };
  _get__("_PLAYER_FUNCS").volumeButton = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").volumeButton),
    toggleActive: function toggleActive(toggle) {
      toggle = typeof toggle == 'undefined' ? null : toggle;

      if (_get__("_PLAYER_FUNCS").volumeButton.node.classList.contains('active') || toggle === false) {
        _get__("_PLAYER_FUNCS").volumeButton.node.classList.remove('active');
      } else {
        _get__("_PLAYER_FUNCS").volumeButton.node.classList.add('active');
      }
    },
    toggleMute: function toggleMute(e) {
      // Unmute
      if (_get__("_WEB_AUDIO").muted) {
        _get__("_WEB_AUDIO").muted = false;

        _get__("_PLAYER_FUNCS").volumeSlider.setPosition(_get__("_SAVEDVOLUME"));

        context.classList.remove('muted');
      } else {
        _assign__("_SAVEDVOLUME", _get__("_WEB_AUDIO").volume);

        _get__("_WEB_AUDIO").muted = true;

        _get__("_PLAYER_FUNCS").volumeSlider.setPosition(0);

        context.classList.add('muted');
      }
    }
  };
  _get__("_PLAYER_FUNCS").volumeSliderMute = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").volumeSliderMute),
    close: function close() {
      _get__("_PLAYER_FUNCS").volumeButton.toggleActive(false);

      _get__("_PLAYER_FUNCS").volumeSliderMute.node.classList.remove('play');
    },
    open: function open() {
      _get__("_PLAYER_FUNCS").volumeButton.toggleActive();

      _get__("_PLAYER_FUNCS").volumeSliderMute.node.classList.add('play');
    },
    toggle: function toggle(e) {
      if (_get__("_PLAYER_FUNCS").volumeSliderMute.node.classList.contains('play')) {
        _get__("_PLAYER_FUNCS").volumeSliderMute.close();
      } else {
        _get__("_PLAYER_FUNCS").volumeSliderMute.open();
      }
    }
  };
  _get__("_PLAYER_FUNCS").volumeSlider = {
    node: _get__("getNodeByClass")(context, _get__("_PLAYER_PARTS_SELECTORS").volumeSlider),
    handleInput: function handleInput(e) {
      _get__("_WEB_AUDIO").volume = e.target.value;
    },
    setPosition: function setPosition(v) {
      _get__("_PLAYER_FUNCS").volumeSlider.node.value = v > 1 ? 1 : v;
    }
  };
}
/**
 * Handle clicks on the playlists button.
 *
 * @param {DOM Event} e 
 */


function _loadAllPlaylistsHandler(e) {
  _get__("_togglePlayerButtons")(true);

  if (!_get__("_WEB_AUDIO").paused) {
    _get__("_pause")();
  } // Reset doesn't work unless we wait.


  setTimeout(function () {
    _get__("_PLAYER_FUNCS").volumeSliderMute.close();

    _get__("_PLAYER_FUNCS").userScreen.reset();

    _get__("_handleAllPlaylists")();
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

function canPlayType(type) {
  return _get__("_WEB_AUDIO").canPlayType(type);
}

function _checkWebAudioApiSupport() {
  var type = typeof Audio === "undefined" ? "undefined" : _typeof(Audio);
  return type == 'function' || type == 'object';
}
/**
 * Connect player buttons
 *
 * @returns {Void}
 */


function _connectPlayerButtons() {
  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").autoplayBtn.node, 'click', _get__("_PLAYER_FUNCS").autoplayBtn.handleButton);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").infoButton.node, 'click', _get__("_PLAYER_FUNCS").infoScreen.toggle);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").nextTrackBtn.node, 'click', _get__("_PLAYER_FUNCS").nextTrackBtn.handleButton);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").playBtn.node, 'click', _get__("_PLAYER_FUNCS").playBtn.handleButton);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").playlistBtn.node, 'click', _get__("_PLAYER_FUNCS").playlistBtn.handleButton);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").prevTrackBtn.node, 'click', _get__("_PLAYER_FUNCS").prevTrackBtn.handleSingleClick);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").prevTrackBtn.node, 'dblclick', _get__("_PLAYER_FUNCS").prevTrackBtn.handleDblClick);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").seekHandleBox.node, 'input', _get__("_PLAYER_FUNCS").seekHandleBox.handleInput);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").muteButton.node, 'click', _get__("_PLAYER_FUNCS").volumeButton.toggleMute);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").volumeButton.node, 'click', _get__("_PLAYER_FUNCS").volumeSliderMute.toggle);

  _get__("_attachEvents")(_get__("_PLAYER_FUNCS").volumeSlider.node, 'input', _get__("_PLAYER_FUNCS").volumeSlider.handleInput);
}
/**
 * Determine the supported mime type.
 * 
 * @param {Array} types List of mime types
 * @returns {Boolean|String} If not false, returns the audio mime.
 */


function _checkMimeSupport() {
  var ans = '';

  for (var x in _get__("_AUDIO_CODECS_MIMES")) {
    for (var xx in _get__("_AUDIO_CODECS_MIMES")[x]) {
      ans = _get__("canPlayType")(_get__("_AUDIO_CODECS_MIMES")[x][xx]);

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
  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'canplay', _get__("_play"));

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'ended', _get__("_handleEndOfAudioEvent"));

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'loadeddata', _get__("_PLAYER_FUNCS").loadProgress.setFullWidth);

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'pause', _get__("_handlePauseEvent"));

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'playing', _get__("_handlePlayingEvent"));

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'progress', _get__("_handleProgressEvent"));

  _get__("_attachEvents")(_get__("_WEB_AUDIO"), 'timeupdate', _get__("_handleTimeUpdateEvent"));
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
      hours = Math.floor(sec_num / 3600),
      minutes = Math.floor((sec_num - hours * 3600) / 60),
      seconds = sec_num - hours * 3600 - minutes * 60,
      time = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  return time;
}
/**
 * 
 * @param {String} str
 * @returns {Text}
 */


function _createTextNode(str) {
  return document.createTextNode(str);
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
  var hypoNext = _get__("_CURRENT_TRACK") + 1;

  if (hypoNext < _get__("_TRACK_COUNT")) {
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
  if (_get__("_CURRENT_TRACK") > 0) {
    return _get__("_CURRENT_TRACK") - 1;
  }

  return _get__("_TRACK_COUNT") - 1;
}
/**
 * Load the playlist with an optional playlist path
 *
 * @param {String} pl Path to load playlist from via AJAX
 * @return {Boolean}
 */


function _loadPlaylist(_x2) {
  return _loadPlaylist2.apply(this, arguments);
}
/**
 * Handle clicks on a single playlist.
 *
 * @param {DOM Event} e 
 */


function _loadPlaylist2() {
  _loadPlaylist2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pl) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(typeof pl != 'string' || pl.length <= 0)) {
              _context2.next = 2;
              break;
            }

            throw new Error('No playlist has been defined!');

          case 2:
            _get__("_PLAYER_FUNCS").ajaxSpinner.toggle(true);

            _get__("_togglePlayerButtons")(true);

            _get__("_PLAYER_FUNCS").playlistBtn.node.classList.remove('active');

            _context2.next = 7;
            return _get__("HttpClient").get(pl);

          case 7:
            return _context2.abrupt("return", _context2.sent);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadPlaylist2.apply(this, arguments);
}

function _playlistButtonHandler(_x3) {
  return _playlistButtonHandler2.apply(this, arguments);
}
/**
 * Handle a playlist after it loads.
 *
 * @param {Object} JSON Playlist.
 * @returns {Void}
 */


function _playlistButtonHandler2() {
  _playlistButtonHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
    var plu, playlistUrl, pl;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            plu = e.target.dataset.playlist;
            e.preventDefault();
            _context3.prev = 2;
            playlistUrl = new URL(plu);
            _context3.next = 6;
            return _get__("_loadPlaylist")(playlistUrl.href);

          case 6:
            pl = _context3.sent;

            _get__("_handlePlaylist")(pl);

            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            console.error(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));
  return _playlistButtonHandler2.apply(this, arguments);
}

function _handlePlaylist(pl) {
  pl = JSON.parse(JSON.stringify(pl));

  _get__("_togglePlayerButtons")(false);

  _assign__("_PLAYLIST", pl);

  _get__("_updateScreenTitle")(_get__("_PLAYLIST").name);

  _assign__("_TRACK_COUNT", _get__("_PLAYLIST").tracks.length);

  _get__("_setUpPlaylistDisplay")();

  _get__("_populateTimeDisplay")('00:00', '00:00');

  var content = pl.info ? "<p>".concat(pl.info, "</p>") : '';

  _get__("_populateInfoBoxContent")(content);
}
/**
 * Handler for loading all playlists defined and
 * imported in 'playlists' named import. This renders
 * a list of playlist buttons in _PLAYER_FUNCS.playlistBox.
 *
 * @returns {Void}
 */


function _handleAllPlaylists() {
  if (typeof _get__("playlists") == 'undefined' || _get__("playlists") == null || _get__("playlists").length <= 0) {
    throw new Error('No playlists found! See public/js/WebAudioPlayer/components/playlists.js');
  }

  _get__("_PLAYER_FUNCS").playlistBtn.node.classList.add('active');

  _get__("_updateScreenTitle")('Playlists');

  _get__("_empty")(_get__("_PLAYER_FUNCS").playlistBox);

  var _iterator = _createForOfIteratorHelper(_get__("playlists")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var playlist = _step.value;
      console.debug(playlist);
      var button = document.createElement('button');
      var li = document.createElement('li');
      button.appendChild(_get__("_createTextNode")(playlist.name));
      button.dataset.playlist = playlist.url;
      button.setAttribute('title', playlist.name);

      _get__("_attachEvents")(button, 'click', _get__("_playlistButtonHandler"));

      li.appendChild(button);

      _get__("_PLAYER_FUNCS").playlistBox.appendChild(li);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/**
 * Event handler for end.
 *
 * @param {Object} e Event object
 * @returns {Void}
 */


function _handleEndOfAudioEvent(e) {
  if (_get__("_AUTO_PLAY")) {
    _get__("_removePlayingClassFromAll")();

    _get__("_loadTrack")(_get__("_getNextTrack")());
  }
}
/**
 * Event handler for pause.
 *
 * @param {Object} e Event object
 * @returns {Void}
 */


function _handlePauseEvent(e) {
  _get__("_PLAYERROOT").classList.remove('playing');

  _get__("_PLAYERROOT").classList.add('paused');
}
/**
 * Event handler for AJAX response.
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */


function _handlePlayingEvent(e) {
  var parent = _get__("_PLAYER_FUNCS").playlistBox.querySelector("button[data-tracknum=\"".concat(_get__("_CURRENT_TRACK"), "\"]")).parentNode;

  _get__("_PLAYERROOT").classList.remove('paused');

  _get__("_PLAYERROOT").classList.add('playing');

  parent.setAttribute('class', 'current');
}
/**
 * Event handler for _WEB_AUDIO loading progress.
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */


function _handleProgressEvent(e) {
  var buffd = e.target.buffered;

  for (var i = 0; i < buffd.length; i++) {
    var percentage = Math.ceil(parseInt(buffd.end(i) / buffd.duration * 100));

    _get__("_PLAYER_FUNCS").loadProgress.setWidth(percentage + '%');
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
  var dur = e.target.duration;
  var time = e.target.currentTime;
  var totalSecondsRemaining = parseInt(dur - time, 10);

  if (isNaN(totalSecondsRemaining)) {
    return;
  }

  _get__("_populateTimeDisplay")(_get__("_convertSecondsToTime")(time), _get__("_convertSecondsToTime")(totalSecondsRemaining, true)); // Set new seek handle position


  _get__("_PLAYER_FUNCS").seekHandleBox.setPosition(time);
}

function _populateInfoBoxContent(content) {
  _get__("_empty")(_get__("_PLAYER_FUNCS").infoScrollContent);

  _get__("_PLAYER_FUNCS").infoScrollContent.innerHTML = content;

  _get__("_PLAYER_FUNCS").infoButton.disable(false);
}
/**
 * Load the current track and any info
 *
 * @param {Number} ct The current track number using a 0-based index.
 * @return {Void}
 */


function _loadTrack(ct) {
  _get__("_pause")();

  _get__("_PLAYER_FUNCS").seekHandleBox.toggleEnable(true);

  _get__("_PLAYER_FUNCS").loadProgress.reset();

  _assign__("_CURRENT_TRACK", parseInt(ct));

  _get__("_WEB_AUDIO").src = _get__("_PLAYLIST").tracks[_CURRENT_TRACK].path; // Enable track info button if track has info

  if (_get__("_PLAYLIST").tracks[_CURRENT_TRACK].info.length <= 0) {
    _get__("_PLAYER_FUNCS").infoButton.disable(false);
  } else {
    var content = "<p>".concat(_get__("_PLAYLIST").tracks[_CURRENT_TRACK].title, "</p>\n\t\t\t").concat(_get__("_PLAYLIST").tracks[_CURRENT_TRACK].info);

    _get__("_populateInfoBoxContent")(content);
  }

  _get__("_WEB_AUDIO").load();
}
/**
 * Pause handler
 *
 * @param {Object} e Event object
 * @returns {Void}
 */


function _pause(e) {
  _get__("_WEB_AUDIO").pause();
}
/**
 * Play handler for _WEB_AUDIO
 *
 * @param {DOM} e Event object
 * @returns {Void}
 */


function _play(e) {
  e.preventDefault();

  _get__("_PLAYER_FUNCS").seekHandleBox.toggleEnable(false);

  _get__("_PLAYER_FUNCS").seekHandleBox.setMax();

  _get__("_WEB_AUDIO").play();
}
/**
 * Set the time displays
 *
 * @param {Number} current
 * @param {Number} remain
 * @returns {Void}
 */


function _populateTimeDisplay(current, remain) {
  _get__("_empty")(_get__("_PLAYER_FUNCS").remainingTime).appendChild(_get__("_createTextNode")(remain));

  _get__("_empty")(_get__("_PLAYER_FUNCS").currentTimeDisplay).appendChild(_get__("_createTextNode")(current));
}
/**
 * Set all track in display list to NOT active by removing the class
 *
 * @return {Void}
 */


function _removePlayingClassFromAll() {
  _get__("_PLAYERROOT").classList.remove('playing');

  var current = _get__("_PLAYER_FUNCS").playlistBox.getElementsByClassName('current')[0];

  if (current) {
    current.removeAttribute('class');
  }
}

function _setAudioObject() {
  var audio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _assign__("_WEB_AUDIO", audio !== null && audio !== void 0 ? audio : new Audio());
}

function _handleLoadTrack(e) {
  _get__("_removePlayingClassFromAll")();

  _get__("_loadTrack")(parseInt(e.target.getAttribute('data-tracknum')));
}
/**
 * Initialize the playlist display and connect to button click event
 *
 * @return {Void}
 */


function _setUpPlaylistDisplay() {
  // Clear list contents
  _get__("_empty")(_get__("_PLAYER_FUNCS").playlistBox);

  for (var x = 0; x < _get__("_PLAYLIST").tracks.length; x++) {
    var track = _get__("_PLAYLIST").tracks[x];

    var li = document.createElement('li');

    var shortText = _get__("_makeShortTitle")(track.title); // Create a new button node & dress it up.


    var btn = document.createElement('button');
    btn.appendChild(_get__("_createTextNode")(shortText));
    btn.setAttribute('data-tracknum', x); // Add to list item

    li.appendChild(btn); // Add to list

    _get__("_PLAYER_FUNCS").playlistBox.appendChild(li); // Add event handler


    _get__("_attachEvents")(btn, 'click', _get__("_handleLoadTrack"));
  }
}
/**
 * Create shortened title
 *
 * @return {String} Shortened title
 */


function _makeShortTitle(titleStr) {
  var cutoff = 50;

  if (titleStr.length <= cutoff) {
    return titleStr;
  }

  var cut = titleStr.substr(0, cutoff);
  var split = cut.split(' ');
  var pop = split.pop();
  return "".concat(split.join(' '), "...");
}
/**
 * Enable/disable all player buttons
 *
 * @param {Boolean} state
 * @returns {Void}
 */


function _togglePlayerButtons(state) {
  var _iterator2 = _createForOfIteratorHelper(_get__("_PLAYER_CONTROL_NODES")),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var node = _step2.value;
      node.disabled = state;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
/**
 * Set the title text
 *
 * @param {String} str New title
 * @returns {Void}
 */


function _updateScreenTitle(str) {
  _get__("_PLAYER_FUNCS").screenTitle.innerHTML = str;
}

function _getGlobalObject() {
  try {
    if (!!__webpack_require__.g) {
      return __webpack_require__.g;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "_PLAYERROOT":
      return _PLAYERROOT;

    case "_HTML5_SUPPORT":
      return _HTML5_SUPPORT;

    case "_checkWebAudioApiSupport":
      return _checkWebAudioApiSupport;

    case "_setAudioObject":
      return _setAudioObject;

    case "_checkMimeSupport":
      return _checkMimeSupport;

    case "_setUpFunctionality":
      return _setUpFunctionality;

    case "_PLAYER_CONTROL_NODES":
      return _PLAYER_CONTROL_NODES;

    case "_PLAYER_FUNCS":
      return _PLAYER_FUNCS;

    case "_togglePlayerButtons":
      return _togglePlayerButtons;

    case "_connectPlayerButtons":
      return _connectPlayerButtons;

    case "_connectAudioEvents":
      return _connectAudioEvents;

    case "_handleAllPlaylists":
      return _handleAllPlaylists;

    case "getNodeByClass":
      return getNodeByClass;

    case "_PLAYER_PARTS_SELECTORS":
      return _PLAYER_PARTS_SELECTORS;

    case "_AUTO_PLAY":
      return _AUTO_PLAY;

    case "_removePlayingClassFromAll":
      return _removePlayingClassFromAll;

    case "_loadTrack":
      return _loadTrack;

    case "_getNextTrack":
      return _getNextTrack;

    case "_WEB_AUDIO":
      return _WEB_AUDIO;

    case "_CURRENT_TRACK":
      return _CURRENT_TRACK;

    case "_play":
      return _play;

    case "_pause":
      return _pause;

    case "_loadAllPlaylistsHandler":
      return _loadAllPlaylistsHandler;

    case "_getPrevTrack":
      return _getPrevTrack;

    case "_populateTimeDisplay":
      return _populateTimeDisplay;

    case "_SAVEDVOLUME":
      return _SAVEDVOLUME;

    case "_attachEvents":
      return _attachEvents;

    case "_AUDIO_CODECS_MIMES":
      return _AUDIO_CODECS_MIMES;

    case "canPlayType":
      return canPlayType;

    case "_handleEndOfAudioEvent":
      return _handleEndOfAudioEvent;

    case "_handlePauseEvent":
      return _handlePauseEvent;

    case "_handlePlayingEvent":
      return _handlePlayingEvent;

    case "_handleProgressEvent":
      return _handleProgressEvent;

    case "_handleTimeUpdateEvent":
      return _handleTimeUpdateEvent;

    case "_TRACK_COUNT":
      return _TRACK_COUNT;

    case "HttpClient":
      return _filterWildcardImport__(_components_HttpClient_js__WEBPACK_IMPORTED_MODULE_0__);

    case "_loadPlaylist":
      return _loadPlaylist;

    case "_handlePlaylist":
      return _handlePlaylist;

    case "_PLAYLIST":
      return _PLAYLIST;

    case "_updateScreenTitle":
      return _updateScreenTitle;

    case "_setUpPlaylistDisplay":
      return _setUpPlaylistDisplay;

    case "_populateInfoBoxContent":
      return _populateInfoBoxContent;

    case "playlists":
      return _components_playlists_js__WEBPACK_IMPORTED_MODULE_1__.playlists;

    case "_empty":
      return _empty;

    case "_createTextNode":
      return _createTextNode;

    case "_playlistButtonHandler":
      return _playlistButtonHandler;

    case "_convertSecondsToTime":
      return _convertSecondsToTime;

    case "_makeShortTitle":
      return _makeShortTitle;

    case "_handleLoadTrack":
      return _handleLoadTrack;
  }

  return undefined;
}

function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {
    case "_PLAYERROOT":
      return _PLAYERROOT = _value;

    case "_HTML5_SUPPORT":
      return _HTML5_SUPPORT = _value;

    case "_PLAYER_CONTROL_NODES":
      return _PLAYER_CONTROL_NODES = _value;

    case "_AUTO_PLAY":
      return _AUTO_PLAY = _value;

    case "_CURRENT_TRACK":
      return _CURRENT_TRACK = _value;

    case "_SAVEDVOLUME":
      return _SAVEDVOLUME = _value;

    case "_PLAYLIST":
      return _PLAYLIST = _value;

    case "_TRACK_COUNT":
      return _TRACK_COUNT = _value;

    case "_WEB_AUDIO":
      return _WEB_AUDIO = _value;
  }

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (_typeof(variableName) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
    return function () {
      Object.keys(variableName).forEach(function (name) {
        _reset__(variableName);
      });
    };
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

function _filterWildcardImport__() {
  var wildcardImport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var validPropertyNames = Object.keys(wildcardImport).filter(function (propertyName) {
    return propertyName !== '__get__' && propertyName !== '__set__' && propertyName !== '__reset__' && propertyName !== '__with__' && propertyName !== '__GetDependency__' && propertyName !== '__Rewire__' && propertyName !== '__ResetDependency__' && propertyName !== '__RewireAPI__';
  });
  return validPropertyNames.reduce(function (filteredWildcardImport, propertyName) {
    filteredWildcardImport[propertyName] = wildcardImport[propertyName];
    return filteredWildcardImport;
  }, {});
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_RewireAPI__);

/***/ }),

/***/ "./src/components/HttpClient.js":
/*!**************************************!*\
  !*** ./src/components/HttpClient.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* binding */ get)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import 'regenerator-runtime/runtime'
var get = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(endpoint) {
    var queryParams,
        URL,
        qp,
        requestParams,
        response,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryParams = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            URL = endpoint;

            if (queryParams) {
              qp = new URLSearchParams(queryParams);
              URL = "".concat(URL, "?").concat(qp.toString);
            }

            requestParams = {
              headers: new Headers({
                'X-Requested-With': ''
              }),
              method: 'GET',
              mode: 'same-origin'
            };
            _context.next = 6;
            return fetch(URL, requestParams);

          case 6:
            response = _context.sent;

            if (response.ok) {
              _context.next = 9;
              break;
            }

            throw new Error('Bad');

          case 9:
            _context.next = 11;
            return response.json();

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/components/playlists.js":
/*!*************************************!*\
  !*** ./src/components/playlists.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playlists": () => (/* binding */ playlists)
/* harmony export */ });
var playlists = [{
  "name": "East 3rd Street Ensemble Samples",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/east-third-st.json")
}, {
  "name": "Prajna Samples",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/prajna.json")
}, {
  "name": "Zuk - An Evening in the Clouds",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/zuk.json")
}, {
  "name": "1975: An Underground Epic Samples",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/1975.json")
}, {
  "name": "Round Robin Sample",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/round-robin.json")
}, {
  "name": "Marim-bass Samples",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/marim-bass.json")
}, {
  "name": "Acoustic Mayhem Sample",
  "url": "".concat("http://127.0.0.1:8080", "/playlists/acoustic-mayhem.json")
}];

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__GetDependency__": () => (/* binding */ _get__),
/* harmony export */   "__ResetDependency__": () => (/* binding */ _reset__),
/* harmony export */   "__RewireAPI__": () => (/* binding */ _RewireAPI__),
/* harmony export */   "__Rewire__": () => (/* binding */ _set__),
/* harmony export */   "__get__": () => (/* binding */ _get__),
/* harmony export */   "__set__": () => (/* binding */ _set__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebAudioPlayer.js */ "./src/WebAudioPlayer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



window.onload = function (e) {
  console.debug(876543);
  var playerNode = document.getElementById('my-boom-box');

  _get__("init")(playerNode);
};

function _getGlobalObject() {
  try {
    if (!!__webpack_require__.g) {
      return __webpack_require__.g;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "init":
      return _WebAudioPlayer_js__WEBPACK_IMPORTED_MODULE_0__.init;
  }

  return undefined;
}

function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (_typeof(variableName) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
    return function () {
      Object.keys(variableName).forEach(function (name) {
        _reset__(variableName);
      });
    };
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_RewireAPI__);

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./node_modules/regenerator-runtime/runtime.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/init.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLE1BQU07QUFDTixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWQtYXNzLWh0bWw1LWF1ZGlvLXBsYXllci8uL3NyYy9XZWJBdWRpb1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYWQtYXNzLWh0bWw1LWF1ZGlvLXBsYXllci8uL3NyYy9jb21wb25lbnRzL0h0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvLi9zcmMvY29tcG9uZW50cy9wbGF5bGlzdHMuanMiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvLi9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly9iYWQtYXNzLWh0bWw1LWF1ZGlvLXBsYXllci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhZC1hc3MtaHRtbDUtYXVkaW8tcGxheWVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYWQtYXNzLWh0bWw1LWF1ZGlvLXBsYXllci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhZC1hc3MtaHRtbDUtYXVkaW8tcGxheWVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmFkLWFzcy1odG1sNS1hdWRpby1wbGF5ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhZC1hc3MtaHRtbDUtYXVkaW8tcGxheWVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBIdHRwQ2xpZW50IGZyb20gJy4vY29tcG9uZW50cy9IdHRwQ2xpZW50LmpzJztcbmltcG9ydCB7IHBsYXlsaXN0cyB9IGZyb20gJy4vY29tcG9uZW50cy9wbGF5bGlzdHMuanMnO1xuLyoqXG4gKiBIVE1MNSBKYXZhU2NyaXB0IEF1ZGlvIFBsYXllciB2MC42LlxuICpcbiAqIERlc2lnbmVkIHRvIHBsYXkgYW55IHN1cHBvcnRlZCBhdWRpbyB0eXBlLlxuICpcbiAqIEBjb3B5cmlnaHQgwqkgMjAxMywyMDIyIENsaWYgSmFja3NvblxuICogQHBhY2thZ2UgSFRNTDUgSmF2YVNjcmlwdCBBdWRpbyBQbGF5ZXJcbiAqIEB2ZXJzaW9uIDAuNlxuICovXG5sZXQgX0FVRElPX0NPREVDU19NSU1FUyAgICAgPSB7XG5cdG1wMzogWydhdWRpby9tcGVnJywgJ2F1ZGlvL01QQScsICdhdWRpby9tcGEtcm9idXN0JywnYXVkaW8vbXBlZzMnLCdhdWRpby94LW1wZWctMyddLFxuXHRtcDQ6IFsnYXVkaW8vYWFjJywgJ2F1ZGlvL2FhY3AnLCAnYXVkaW8vM2dwcCcsICdhdWRpby8zZ3BwMicsICdhdWRpby9tcDQnLCAnYXVkaW8vTVA0QS1MQVRNJywgJ2F1ZGlvL21wZWc0LWdlbmVyaWMnXSxcblx0b2dnOiBbJ2FwcGxpY2F0aW9uL29nZycsICdhdWRpby9vZ2EnLCAnYXVkaW8vb2dnJywgJ2F1ZGlvL3ZvcmJpcycsICdhdWRpby92b3JiaXMtY29uZmlnJ10sXG5cdHdlYm06IFsnYXVkaW8vd2VibSddLFxuXHR3YXY6IFsnYXVkaW8vdm5kLndhdmUnLCAnYXVkaW8vd2F2JywgJ2F1ZGlvL3dhdmUnLCAnYXVkaW8veC13YXYnXVxufTtcbmxldCBfV0VCX0FVRElPIFx0XHRcdFx0PSBudWxsO1xubGV0IF9BVVRPX1BMQVlcdFx0XHRcdD0gZmFsc2U7XG5sZXQgX0NVUlJFTlRfVFJBQ0sgICAgICBcdD0gbnVsbDtcbmxldCBfSFRNTDVfU1VQUE9SVFx0XHRcdD0gZmFsc2U7XG5sZXQgX1BMQVlFUlJPT1RcdFx0XHRcdD0gbnVsbDtcbmxldCBfUExBWUVSX0NPTlRST0xfTk9ERVNcdD0gW107XG5sZXQgX1BMQVlMSVNUICAgICAgICAgICAgICAgPSBudWxsO1xubGV0IF9UUkFDS19DT1VOVFx0XHRcdD0gMDtcbmxldCBfU0FWRURWT0xVTUVcdFx0XHQ9IDA7XG5sZXQgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMgPSB7XG5cdGFqYXhTcGlubmVyOiAnLm5ldC1zdGF0LWJveCcsXG5cdGF1dG9wbGF5QnRuOiAnLmF1dG9wbGF5LWJ0bicsXG5cdGN1cnJlbnRUaW1lRGlzcGxheTogJy5jdXJyZW50LXRpbWUnLFxuXHRpbmZvQnV0dG9uOiAnLmluZm8tYnV0dG9uJyxcblx0aW5mb1NjcmVlbjogJy5pbmZvLXNjcmVlbicsXG5cdGluZm9TY3JvbGw6ICcuaW5mby1zY3JvbGwtYm94Jyxcblx0aW5mb1Njcm9sbENvbnRlbnQ6ICcuaW5mby1jb250ZW50LWJveCcsXG5cdGxvYWRQcm9ncmVzczogJy5sb2FkaW5nLWJhcicsXG5cdG11dGVCdXR0b246ICcubXV0ZS1idXR0b24nLFxuXHRuZXh0VHJhY2tCdG46ICcubmV4dC10cmFjay1idG4nLFxuXHRwbGF5QnRuOiAnLnBsYXktYnRuJyxcblx0cGxheWxpc3RCb3g6ICcucGxheWxpc3Qtc2Nyb2xsLWJveCcsXG5cdHBsYXlsaXN0QnRuOiAnLnBsYXlsaXN0LWJ0bicsXG5cdHByZXZUcmFja0J0bjogJy5wcmV2LXRyYWNrLWJ0bicsXG5cdHJlbWFpbmluZ1RpbWU6ICcucmVtYWluaW5nLXRpbWUnLFxuXHRzZWVrSGFuZGxlQm94OiAnLnNlZWstaGFuZGxlLWJveCcsXG5cdHNjcmVlblRpdGxlOiAnLnNjcmVlbi10aXRsZScsXG5cdHVzZXJTY3JlZW46ICcudXNlci1zY3JlZW4nLFxuXHR2b2x1bWVTbGlkZXJNdXRlOiAnLnZvbHVtZS1zbGlkZXItbXV0ZS1ib3gnLFxuXHR2b2x1bWVCdXR0b246ICcudm9sdW1lLWJ1dHRvbicsXG5cdHZvbHVtZVNsaWRlcjogJy52b2x1bWUtc2xpZGVyJ1xufVxubGV0IF9QTEFZRVJfRlVOQ1NcdFx0XHQ9IHtcbiAgICBhamF4U3Bpbm5lcjoge30sXG4gICAgYXV0b3BsYXlCdG46IHt9LFxuICAgIGN1cnJlbnRUaW1lRGlzcGxheTogbnVsbCxcbiAgICBpbmZvQnV0dG9uOiB7fSxcbiAgICBpbmZvU2NyZWVuOiB7fSxcbiAgICBpbmZvU2Nyb2xsOiBudWxsLFxuICAgIGluZm9TY3JvbGxDb250ZW50OiBudWxsLFxuICAgIGxvYWRQcm9ncmVzczoge30sXG4gICAgbXV0ZUJ1dHRvbjoge30sXG4gICAgbmV4dFRyYWNrQnRuOiB7fSxcbiAgICBwbGF5QnRuOiB7fSxcbiAgICBwbGF5bGlzdEJveDogbnVsbCxcbiAgICBwbGF5bGlzdEJ0bjoge30sXG4gICAgcHJldlRyYWNrQnRuOiB7fSxcbiAgICByZW1haW5pbmdUaW1lOiBudWxsLFxuICAgIHNlZWtIYW5kbGVCb3g6IHt9LFxuICAgIHNjcmVlblRpdGxlOiBudWxsLFxuICAgIHVzZXJTY3JlZW46IHt9LFxuICAgIHZvbHVtZUJ1dHRvbjoge30sXG4gICAgdm9sdW1lU2xpZGVyTXV0ZToge30sXG4gICAgdm9sdW1lU2xpZGVyOiB7fVxufVxuXG5leHBvcnQgY29uc3QgdmVyc2lvblx0XHQ9ICcwLjYnO1xuXG4vKipcbiAqIFB1YmxpYyBNZXRob2RzXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgcGxheWVyXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gZmFsc2Ugb24gZXJyb3JcbiAqL1xuIGV4cG9ydCBjb25zdCBpbml0ID0gYXN5bmMgKHBsYXllciwgYXVkaW8gPSBudWxsKSA9PiB7XG5cdF9QTEFZRVJST09UXHRcdD0gcGxheWVyO1xuXHRfSFRNTDVfU1VQUE9SVFx0PSBfY2hlY2tXZWJBdWRpb0FwaVN1cHBvcnQoKTtcblxuXHR0cnkge1xuXHRcdGlmICghX0hUTUw1X1NVUFBPUlQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignV2ViIEF1ZGlvIGlzIG5vdCBzdXBwb3J0ZWQgb24geW91ciBkZXZpY2UgOignKTtcblx0XHR9XG5cblx0XHRfUExBWUVSUk9PVC5jbGFzc0xpc3QuYWRkKCdwYXVzZWQnKTtcblx0XHRfc2V0QXVkaW9PYmplY3QoYXVkaW8pO1xuXG4gICAgICAgIGlmICghX2NoZWNrTWltZVN1cHBvcnQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBhdWRpbyBjb2RlYyBzdXBwb3J0ZWQgZm9yIHRoaXMgZGV2aWNlLicpO1xuICAgICAgICB9XG5cblx0XHRfc2V0VXBGdW5jdGlvbmFsaXR5KHBsYXllcik7XG5cdFx0X1BMQVlFUl9DT05UUk9MX05PREVTID0gW1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5hdXRvcGxheUJ0bi5ub2RlLFxuXHRcdFx0X1BMQVlFUl9GVU5DUy5wbGF5QnRuLm5vZGUsXG5cdFx0XHRfUExBWUVSX0ZVTkNTLnByZXZUcmFja0J0bi5ub2RlLFxuXHRcdFx0X1BMQVlFUl9GVU5DUy5tdXRlQnV0dG9uLm5vZGUsXG5cdFx0XHRfUExBWUVSX0ZVTkNTLm5leHRUcmFja0J0bi5ub2RlLFxuXHRcdFx0X1BMQVlFUl9GVU5DUy5zZWVrSGFuZGxlQm94Lm5vZGUsXG5cdFx0XHRfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlci5ub2RlXG5cdFx0XTtcblx0XHRfdG9nZ2xlUGxheWVyQnV0dG9ucyh0cnVlKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHZvbHVtZVxuXHRcdF9QTEFZRVJfRlVOQ1Mudm9sdW1lU2xpZGVyLnNldFBvc2l0aW9uKDEpO1xuXHRcdC8vIEluaXRpYWxpemUgYXVkaW8gc2VlayBwb3NpdGlvblxuICAgICAgICBfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3guc2V0UG9zaXRpb24oMCk7XG5cdFx0Ly8gRGlzYWJsZSB0aGUgaW5mbyBidXR0b24gdW50aWwgc29tZXRoaW5nIGlzIGxvYWRlZFxuXHRcdF9QTEFZRVJfRlVOQ1MuaW5mb0J1dHRvbi5kaXNhYmxlKHRydWUpO1xuXG5cdFx0X2Nvbm5lY3RQbGF5ZXJCdXR0b25zKCk7XG5cdFx0X2Nvbm5lY3RBdWRpb0V2ZW50cygpO1xuXHRcdF9oYW5kbGVBbGxQbGF5bGlzdHMoKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGNhdGNoIChlcnIpIHtcblx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbi8qKlxuICogUHJpdmF0ZSBNZXRob2RzXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0IFBsYXllciByb290IGRvbSBub2RlLlxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge29iamVjdH0gRE9NTm9kZXxudWxsXG4gKi9cbmZ1bmN0aW9uIGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb250ZXh0LmlkfSAke2NsYXNzTmFtZX1gKTtcbn1cblxuLyoqXG4gKiBEZWZpbmUgYWxsIHRoZSBmdW5jdGlvbmFsaXR5IHRoZSBwbGF5ZXIgVUkgbmVlZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbnRleHQgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcGxheWVyIGluc3RhbmNlLlxuICogQHBhcmFtIHtXZWIgQXVkaW8gRWxlbWVudH0gX1dFQl9BVURJTyBXZWIgQXVkaW8gaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIF9zZXRVcEZ1bmN0aW9uYWxpdHkoY29udGV4dCkge1xuXHRfUExBWUVSX0ZVTkNTLmFqYXhTcGlubmVyID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLmFqYXhTcGlubmVyKSxcblx0XHR0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG5cdFx0XHRpZiAoc3RhdGUpIHtcblx0XHRcdFx0X1BMQVlFUl9GVU5DUy5hamF4U3Bpbm5lci5ub2RlLmNsYXNzTGlzdC5hZGQoJ3BsYXknKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRfUExBWUVSX0ZVTkNTLmFqYXhTcGlubmVyLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncGxheScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRfUExBWUVSX0ZVTkNTLmF1dG9wbGF5QnRuID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLmF1dG9wbGF5QnRuKSxcblx0XHRoYW5kbGVCdXR0b246IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmICghX0FVVE9fUExBWSkge1xuXHRcdFx0XHRfQVVUT19QTEFZID0gdHJ1ZTtcblx0XHRcdFx0Y29udGV4dC5jbGFzc0xpc3QuYWRkKCdhdXRvcGxheScpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdF9BVVRPX1BMQVkgPSBmYWxzZTtcblx0XHRcdFx0Y29udGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdhdXRvcGxheScpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRfUExBWUVSX0ZVTkNTLmN1cnJlbnRUaW1lRGlzcGxheSA9IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLmN1cnJlbnRUaW1lRGlzcGxheSk7XG5cdF9QTEFZRVJfRlVOQ1MuaW5mb0J1dHRvbiA9IHtcblx0XHRub2RlOiBnZXROb2RlQnlDbGFzcyhjb250ZXh0LCBfUExBWUVSX1BBUlRTX1NFTEVDVE9SUy5pbmZvQnV0dG9uKSxcblx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0aWYgKHN0YXRlKSB7XG5cdFx0XHRcdF9QTEFZRVJfRlVOQ1MuaW5mb0J1dHRvbi5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1pbmZvJyk7XG5cdFx0XHRcdF9QTEFZRVJfRlVOQ1MuaW5mb0J1dHRvbi5ub2RlLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRfUExBWUVSX0ZVTkNTLmluZm9CdXR0b24ubm9kZS5jbGFzc0xpc3QuYWRkKCdoYXMtaW5mbycpO1xuXHRcdFx0XHRfUExBWUVSX0ZVTkNTLmluZm9CdXR0b24ubm9kZS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRfUExBWUVSX0ZVTkNTLmluZm9TY3JlZW4gPSB7XG5cdFx0bm9kZTogZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMuaW5mb1NjcmVlbiksXG5cdFx0Y2xvc2U6IGZ1bmN0aW9uKGZhc3QpIHtcblx0XHRcdGlmIChmYXN0KSB7XG5cdFx0XHRcdF9QTEFZRVJfRlVOQ1MuaW5mb1NjcmVlbi5ub2RlLmNsYXNzTGlzdC5hZGQoJ2Zhc3QnKTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRfUExBWUVSX0ZVTkNTLmluZm9TY3JlZW4ubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdmYXN0Jyk7XG5cdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHR9XG5cdFx0XHRfUExBWUVSX0ZVTkNTLmluZm9TY3JlZW4ubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5Jyk7XG5cdFx0fSxcblx0XHRvcGVuOiBmdW5jdGlvbigpIHtcblx0XHRcdF9QTEFZRVJfRlVOQ1MuaW5mb1NjcmVlbi5ub2RlLmNsYXNzTGlzdC5hZGQoJ3BsYXknKTtcblx0XHR9LFxuXHRcdHRvZ2dsZTogZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKF9QTEFZRVJfRlVOQ1MuaW5mb1NjcmVlbi5ub2RlLmNsYXNzTGlzdC5jb250YWlucygncGxheScpKSB7XG5cdFx0XHRcdF9QTEFZRVJfRlVOQ1MuaW5mb1NjcmVlbi5jbG9zZSgpO1xuXHRcdFx0XHQvLyBjbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRfUExBWUVSX0ZVTkNTLmluZm9TY3JlZW4ub3BlbigpO1xuXHRcdFx0XHQvLyBjbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0X1BMQVlFUl9GVU5DUy5pbmZvU2Nyb2xsID0gZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMuaW5mb1Njcm9sbCk7XG5cdF9QTEFZRVJfRlVOQ1MuaW5mb1Njcm9sbENvbnRlbnQgPSBnZXROb2RlQnlDbGFzcyhjb250ZXh0LCBfUExBWUVSX1BBUlRTX1NFTEVDVE9SUy5pbmZvU2Nyb2xsQ29udGVudCk7XG5cdF9QTEFZRVJfRlVOQ1MubG9hZFByb2dyZXNzID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLmxvYWRQcm9ncmVzcyksXG5cdFx0cmVzZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5sb2FkUHJvZ3Jlc3Muc2V0V2lkdGgoJzAnKTtcblx0XHR9LFxuXHRcdHNldEZ1bGxXaWR0aDogZnVuY3Rpb24oZSkge1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5sb2FkUHJvZ3Jlc3Muc2V0V2lkdGgoJzEwMCUnKTtcblx0XHR9LFxuXHRcdHNldFdpZHRoOiBmdW5jdGlvbih3KSB7XG5cdFx0XHRfUExBWUVSX0ZVTkNTLmxvYWRQcm9ncmVzcy5ub2RlLnN0eWxlLndpZHRoID0gdztcblx0XHR9XG5cdH1cblx0X1BMQVlFUl9GVU5DUy5tdXRlQnV0dG9uID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLm11dGVCdXR0b24pXG5cdH1cblx0X1BMQVlFUl9GVU5DUy5uZXh0VHJhY2tCdG4gPSB7XG5cdFx0bm9kZTogZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMubmV4dFRyYWNrQnRuKSxcblx0XHRoYW5kbGVCdXR0b246IGZ1bmN0aW9uKGUpIHtcblx0XHRcdF9yZW1vdmVQbGF5aW5nQ2xhc3NGcm9tQWxsKCk7XG5cdFx0XHRfbG9hZFRyYWNrKF9nZXROZXh0VHJhY2soKSk7XG5cdFx0fVxuXHR9XG5cdF9QTEFZRVJfRlVOQ1MucGxheUJ0biA9IHtcblx0XHRub2RlOiBnZXROb2RlQnlDbGFzcyhjb250ZXh0LCBfUExBWUVSX1BBUlRTX1NFTEVDVE9SUy5wbGF5QnRuKSxcblx0XHRoYW5kbGVCdXR0b246IGZ1bmN0aW9uKGUpIHtcblx0XHRcdC8vIEZvciB0aGUgdmVyeSBmaXJzdCBwbGF5IGFmdGVyIHBhZ2UgbG9hZFxuXHRcdFx0aWYgKF9XRUJfQVVESU8ucGF1c2VkICYmIF9DVVJSRU5UX1RSQUNLID09IG51bGwpIHtcblx0XHRcdFx0X0NVUlJFTlRfVFJBQ0sgPSAwO1xuXHRcdFx0XHRfbG9hZFRyYWNrKF9DVVJSRU5UX1RSQUNLKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKF9XRUJfQVVESU8ucGF1c2VkKSB7XG5cdFx0XHRcdF9wbGF5KGUpOyAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X3BhdXNlKGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRfUExBWUVSX0ZVTkNTLnBsYXlsaXN0Qm94ID0gZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMucGxheWxpc3RCb3gpO1xuXHRfUExBWUVSX0ZVTkNTLnBsYXlsaXN0QnRuID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnBsYXlsaXN0QnRuKSxcblx0XHRoYW5kbGVCdXR0b246IF9sb2FkQWxsUGxheWxpc3RzSGFuZGxlclxuXHR9XG5cdF9QTEFZRVJfRlVOQ1MucHJldlRyYWNrQnRuID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnByZXZUcmFja0J0biksXG5cdFx0aGFuZGxlU2luZ2xlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdF9XRUJfQVVESU8uY3VycmVudFRpbWUgPSAwO1xuXHRcdH0sXG5cdFx0aGFuZGxlRGJsQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdF9yZW1vdmVQbGF5aW5nQ2xhc3NGcm9tQWxsKCk7XG5cdFx0XHRfbG9hZFRyYWNrKF9nZXRQcmV2VHJhY2soKSk7XG5cdFx0fVxuXHR9XG5cdF9QTEFZRVJfRlVOQ1MucmVtYWluaW5nVGltZSA9IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnJlbWFpbmluZ1RpbWUpO1xuXHRfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3ggPSB7XG5cdFx0bm9kZTogZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMuc2Vla0hhbmRsZUJveCksXG5cdFx0aGFuZGxlSW5wdXQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdF9XRUJfQVVESU8uY3VycmVudFRpbWUgPSBlLnRhcmdldC52YWx1ZTtcblx0XHR9LFxuXHRcdHJlc2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdF9QTEFZRVJfRlVOQ1Muc2Vla0hhbmRsZUJveC5ub2RlLnZhbHVlID0gMDtcblx0XHRcdF9QTEFZRVJfRlVOQ1Muc2Vla0hhbmRsZUJveC50b2dnbGVFbmFibGUodHJ1ZSk7XG5cdFx0fSxcblx0XHRzZXRNYXg6IGZ1bmN0aW9uKCkge1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5zZWVrSGFuZGxlQm94Lm5vZGUuc2V0QXR0cmlidXRlKCdtYXgnLCBfV0VCX0FVRElPLnNlZWthYmxlLmVuZCgwKSk7XG5cdFx0fSxcblx0XHRzZXRQb3NpdGlvbjogZnVuY3Rpb24odmFsKSB7XG5cdFx0XHRfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3gubm9kZS52YWx1ZSA9IHZhbDtcblx0XHR9LFxuXHRcdHRvZ2dsZUVuYWJsZTogZnVuY3Rpb24oc3RhdHVzKSB7XG5cdFx0XHRfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3gubm9kZS5kaXNhYmxlZCA9IHN0YXR1cztcblx0XHR9XG5cdH1cblx0X1BMQVlFUl9GVU5DUy5zY3JlZW5UaXRsZSA9IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnNjcmVlblRpdGxlKTtcblx0X1BMQVlFUl9GVU5DUy51c2VyU2NyZWVuID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnVzZXJTY3JlZW4pLFxuXHRcdHJlc2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdF9QTEFZRVJfRlVOQ1Muc2Vla0hhbmRsZUJveC5yZXNldCgpO1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5pbmZvU2NyZWVuLmNsb3NlKHRydWUpO1xuXHRcdFx0X1BMQVlFUl9GVU5DUy5sb2FkUHJvZ3Jlc3MucmVzZXQoKTtcblx0XHRcdF9wb3B1bGF0ZVRpbWVEaXNwbGF5KCcwMDowMCcsICcwMDowMCcpO1xuXHRcdH1cblx0fVxuXHRfUExBWUVSX0ZVTkNTLnZvbHVtZUJ1dHRvbiA9IHtcblx0XHRub2RlOiBnZXROb2RlQnlDbGFzcyhjb250ZXh0LCBfUExBWUVSX1BBUlRTX1NFTEVDVE9SUy52b2x1bWVCdXR0b24pLFxuXHRcdHRvZ2dsZUFjdGl2ZTogZnVuY3Rpb24odG9nZ2xlKSB7XG5cdFx0XHR0b2dnbGUgPSB0eXBlb2YgdG9nZ2xlID09ICd1bmRlZmluZWQnID8gbnVsbCA6IHRvZ2dsZTtcblxuXHRcdFx0aWYgKF9QTEFZRVJfRlVOQ1Mudm9sdW1lQnV0dG9uLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSB8fCB0b2dnbGUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdF9QTEFZRVJfRlVOQ1Mudm9sdW1lQnV0dG9uLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVCdXR0b24ubm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvZ2dsZU11dGU6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdC8vIFVubXV0ZVxuXHRcdFx0aWYgKF9XRUJfQVVESU8ubXV0ZWQpIHtcblx0XHRcdFx0X1dFQl9BVURJTy5tdXRlZCA9IGZhbHNlO1xuXHRcdFx0XHRfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlci5zZXRQb3NpdGlvbihfU0FWRURWT0xVTUUpO1xuXHRcdFx0XHRjb250ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ211dGVkJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdF9TQVZFRFZPTFVNRSA9IF9XRUJfQVVESU8udm9sdW1lO1xuXHRcdFx0XHRfV0VCX0FVRElPLm11dGVkID0gdHJ1ZTtcblx0XHRcdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXIuc2V0UG9zaXRpb24oMCk7XG5cdFx0XHRcdGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnbXV0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlID0ge1xuXHRcdG5vZGU6IGdldE5vZGVCeUNsYXNzKGNvbnRleHQsIF9QTEFZRVJfUEFSVFNfU0VMRUNUT1JTLnZvbHVtZVNsaWRlck11dGUpLFxuXHRcdGNsb3NlOiBmdW5jdGlvbigpIHtcblx0XHRcdF9QTEFZRVJfRlVOQ1Mudm9sdW1lQnV0dG9uLnRvZ2dsZUFjdGl2ZShmYWxzZSk7XG5cdFx0XHRfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlck11dGUubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5Jyk7XG5cdFx0fSxcblx0XHRvcGVuOiBmdW5jdGlvbigpIHtcblx0XHRcdF9QTEFZRVJfRlVOQ1Mudm9sdW1lQnV0dG9uLnRvZ2dsZUFjdGl2ZSgpO1xuXHRcdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlLm5vZGUuY2xhc3NMaXN0LmFkZCgncGxheScpO1xuXHRcdH0sXG5cdFx0dG9nZ2xlOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoX1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlLm5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5JykpIHtcblx0XHRcdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlLmNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlLm9wZW4oKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXIgPSB7XG5cdFx0bm9kZTogZ2V0Tm9kZUJ5Q2xhc3MoY29udGV4dCwgX1BMQVlFUl9QQVJUU19TRUxFQ1RPUlMudm9sdW1lU2xpZGVyKSxcblx0XHRoYW5kbGVJbnB1dDogZnVuY3Rpb24oZSkge1xuXHRcdFx0X1dFQl9BVURJTy52b2x1bWUgPSBlLnRhcmdldC52YWx1ZTtcblx0XHR9LFxuXHRcdHNldFBvc2l0aW9uOiBmdW5jdGlvbih2KSB7XG5cdFx0XHRfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlci5ub2RlLnZhbHVlID0gdiA+IDEgPyAxIDogdjtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgY2xpY2tzIG9uIHRoZSBwbGF5bGlzdHMgYnV0dG9uLlxuICpcbiAqIEBwYXJhbSB7RE9NIEV2ZW50fSBlIFxuICovXG5mdW5jdGlvbiBfbG9hZEFsbFBsYXlsaXN0c0hhbmRsZXIoZSkge1xuXHRfdG9nZ2xlUGxheWVyQnV0dG9ucyh0cnVlKTtcblxuXHRpZiAoIV9XRUJfQVVESU8ucGF1c2VkKSB7XG5cdFx0X3BhdXNlKCk7XG5cdH1cblxuXHQvLyBSZXNldCBkb2Vzbid0IHdvcmsgdW5sZXNzIHdlIHdhaXQuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0X1BMQVlFUl9GVU5DUy52b2x1bWVTbGlkZXJNdXRlLmNsb3NlKCk7XG5cdFx0X1BMQVlFUl9GVU5DUy51c2VyU2NyZWVuLnJlc2V0KCk7XG5cdFx0X2hhbmRsZUFsbFBsYXlsaXN0cygpO1xuXHR9LCAxMDApO1xufVxuXG4vKipcbiAqIENvbXZlbmllbmNlIG1ldGhvZCBmb3IgYXR0YWNoaW5nIGV2ZW50IGhhbmRsZXJzIHRvIERPTSBub2RlLlxuICpcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IG5vZGUgRE9NIE5vZGUgdG8gYXR0YWNoIGV2ZW50IHRvLlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IERPTSBldmVudCB0byBhdHRhY2ggdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9hdHRhY2hFdmVudHMobm9kZSwgZXZlbnQsIGhhbmRsZXIpIHtcblx0aWYgKHR5cGVvZiBub2RlLmFkZEV2ZW50TGlzdGVuZXIgIT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGF0dGFjaCBldmVudHMuIENsaWVudCBkb2VzIG5vdCBzdXBwb3J0IGFkZEV2ZW50TGlzdGVuZXIgbWV0aG9kLicpO1xuXHR9XG5cdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBjYW5QbGF5VHlwZSh0eXBlKSB7XG5cdHJldHVybiBfV0VCX0FVRElPLmNhblBsYXlUeXBlKHR5cGUpO1xufVxuXG5mdW5jdGlvbiBfY2hlY2tXZWJBdWRpb0FwaVN1cHBvcnQoKSB7XG5cdGNvbnN0IHR5cGUgPSB0eXBlb2YgQXVkaW87XG5cdHJldHVybiAodHlwZSA9PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG4vKipcbiAqIENvbm5lY3QgcGxheWVyIGJ1dHRvbnNcbiAqXG4gKiBAcmV0dXJucyB7Vm9pZH1cbiAqL1xuIGZ1bmN0aW9uIF9jb25uZWN0UGxheWVyQnV0dG9ucygpIHtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLmF1dG9wbGF5QnRuLm5vZGUsICdjbGljaycsIF9QTEFZRVJfRlVOQ1MuYXV0b3BsYXlCdG4uaGFuZGxlQnV0dG9uKTtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLmluZm9CdXR0b24ubm9kZSwgJ2NsaWNrJywgX1BMQVlFUl9GVU5DUy5pbmZvU2NyZWVuLnRvZ2dsZSk7XG5cdF9hdHRhY2hFdmVudHMoX1BMQVlFUl9GVU5DUy5uZXh0VHJhY2tCdG4ubm9kZSwgJ2NsaWNrJywgX1BMQVlFUl9GVU5DUy5uZXh0VHJhY2tCdG4uaGFuZGxlQnV0dG9uKTtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLnBsYXlCdG4ubm9kZSwgJ2NsaWNrJywgX1BMQVlFUl9GVU5DUy5wbGF5QnRuLmhhbmRsZUJ1dHRvbik7XG5cdF9hdHRhY2hFdmVudHMoX1BMQVlFUl9GVU5DUy5wbGF5bGlzdEJ0bi5ub2RlLCAnY2xpY2snLCBfUExBWUVSX0ZVTkNTLnBsYXlsaXN0QnRuLmhhbmRsZUJ1dHRvbik7XG5cdF9hdHRhY2hFdmVudHMoX1BMQVlFUl9GVU5DUy5wcmV2VHJhY2tCdG4ubm9kZSwgJ2NsaWNrJywgX1BMQVlFUl9GVU5DUy5wcmV2VHJhY2tCdG4uaGFuZGxlU2luZ2xlQ2xpY2spO1xuXHRfYXR0YWNoRXZlbnRzKF9QTEFZRVJfRlVOQ1MucHJldlRyYWNrQnRuLm5vZGUsICdkYmxjbGljaycsIF9QTEFZRVJfRlVOQ1MucHJldlRyYWNrQnRuLmhhbmRsZURibENsaWNrKTtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3gubm9kZSwgJ2lucHV0JywgX1BMQVlFUl9GVU5DUy5zZWVrSGFuZGxlQm94LmhhbmRsZUlucHV0KTtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLm11dGVCdXR0b24ubm9kZSwgJ2NsaWNrJywgX1BMQVlFUl9GVU5DUy52b2x1bWVCdXR0b24udG9nZ2xlTXV0ZSk7XG4gICAgX2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLnZvbHVtZUJ1dHRvbi5ub2RlLCAnY2xpY2snLCBfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlck11dGUudG9nZ2xlKTtcblx0X2F0dGFjaEV2ZW50cyhfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlci5ub2RlLCAnaW5wdXQnLCBfUExBWUVSX0ZVTkNTLnZvbHVtZVNsaWRlci5oYW5kbGVJbnB1dCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIHRoZSBzdXBwb3J0ZWQgbWltZSB0eXBlLlxuICogXG4gKiBAcGFyYW0ge0FycmF5fSB0eXBlcyBMaXN0IG9mIG1pbWUgdHlwZXNcbiAqIEByZXR1cm5zIHtCb29sZWFufFN0cmluZ30gSWYgbm90IGZhbHNlLCByZXR1cm5zIHRoZSBhdWRpbyBtaW1lLlxuICovXG5mdW5jdGlvbiBfY2hlY2tNaW1lU3VwcG9ydCgpIHtcblx0dmFyIGFucyA9ICcnO1xuXG5cdGZvciAobGV0IHggaW4gX0FVRElPX0NPREVDU19NSU1FUykge1xuICAgICAgICBmb3IgKGxldCB4eCBpbiBfQVVESU9fQ09ERUNTX01JTUVTW3hdKSB7XG4gICAgICAgICAgICBhbnMgPSBjYW5QbGF5VHlwZShfQVVESU9fQ09ERUNTX01JTUVTW3hdW3h4XSk7XG5cbiAgICAgICAgICAgIGlmIChhbnMgPT09ICdwcm9iYWJseScgfHwgYW5zID09PSAnbWF5YmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb25uZWN0IHRvIHRoZSBIVE1MNSBtZWRpYSBldmVudHNcbiAqXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiBfY29ubmVjdEF1ZGlvRXZlbnRzKCkge1xuXHRfYXR0YWNoRXZlbnRzKF9XRUJfQVVESU8sICdjYW5wbGF5JywgX3BsYXkpO1xuXHRfYXR0YWNoRXZlbnRzKF9XRUJfQVVESU8sICdlbmRlZCcsIF9oYW5kbGVFbmRPZkF1ZGlvRXZlbnQpO1xuXHRfYXR0YWNoRXZlbnRzKF9XRUJfQVVESU8sICdsb2FkZWRkYXRhJywgX1BMQVlFUl9GVU5DUy5sb2FkUHJvZ3Jlc3Muc2V0RnVsbFdpZHRoKTtcblx0X2F0dGFjaEV2ZW50cyhfV0VCX0FVRElPLCAncGF1c2UnLCBfaGFuZGxlUGF1c2VFdmVudCk7XG5cdF9hdHRhY2hFdmVudHMoX1dFQl9BVURJTywgJ3BsYXlpbmcnLCBfaGFuZGxlUGxheWluZ0V2ZW50KTtcblx0X2F0dGFjaEV2ZW50cyhfV0VCX0FVRElPLCAncHJvZ3Jlc3MnLCBfaGFuZGxlUHJvZ3Jlc3NFdmVudCk7XG5cdF9hdHRhY2hFdmVudHMoX1dFQl9BVURJTywgJ3RpbWV1cGRhdGUnLCBfaGFuZGxlVGltZVVwZGF0ZUV2ZW50KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IHNlY29uZHMgdG8gbWluczpzZWNzIGZvcm1hdFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzIEN1cnJlbnQgcGxheSB0aW1lIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcmV2IFJldmVyc2UgdGhlIHRpbWVcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIF9jb252ZXJ0U2Vjb25kc1RvVGltZShzLCByZXYpIHtcblx0aWYgKHJldiA9PT0gdHJ1ZSkge1xuXHRcdHZhciBtaW5zID0gTWF0aC5mbG9vcihzIC8gNjAsIDEwKSxcblx0XHRzZWNzID0gcyAtIG1pbnMgKiA2MCxcblx0XHR0aW1lID0gKG1pbnMgPiA5ID8gbWlucyA6ICcwJyArIG1pbnMpICsgJzonICsgKHNlY3MgPiA5ID8gc2VjcyA6ICcwJyArIHNlY3MpO1xuXG5cdFx0cmV0dXJuIHRpbWU7XG5cdH1cblxuXHR2YXIgc2VjX251bSA9IHBhcnNlSW50KHMsIDEwKSxcblx0aG91cnMgICA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDM2MDApLFxuXHRtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjX251bSAtIChob3VycyAqIDM2MDApKSAvIDYwKSxcblx0c2Vjb25kcyA9IHNlY19udW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApLFxuXHR0aW1lID0gKG1pbnV0ZXMgPCAxMCA/ICcwJyArIG1pbnV0ZXMgOiBtaW51dGVzKSArICc6JyArIChzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kcyk7XG5cblx0cmV0dXJuIHRpbWU7XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7VGV4dH1cbiAqL1xuZnVuY3Rpb24gX2NyZWF0ZVRleHROb2RlKHN0cikge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7dHlwZX0gbm9kZVxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9lbXB0eShub2RlKSB7XG5cdHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcblx0XHRub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG5cdH1cblxuXHRyZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBUaGUgbmV4dCB0cmFjayBvciB0aGUgZmlyc3QgdHJhY2tcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IE5ldyB0cmFjayBudW1iZXJcbiAqL1xuZnVuY3Rpb24gX2dldE5leHRUcmFjaygpIHtcblx0dmFyIGh5cG9OZXh0ID0gX0NVUlJFTlRfVFJBQ0sgKyAxO1xuXG5cdGlmIChoeXBvTmV4dCA8IF9UUkFDS19DT1VOVCkge1xuICAgICAgICByZXR1cm4gaHlwb05leHQ7XG4gICAgfVxuXG5cdHJldHVybiAwO1xufVxuXG4vKipcbiAqIFRoZSBwcmV2aW91cyB0cmFjayBvciB0aGUgbGFzdCB0cmFja1xuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTmV3IHRyYWNrIG51bWJlclxuICovXG5mdW5jdGlvbiBfZ2V0UHJldlRyYWNrKCkge1xuXHRpZiAoX0NVUlJFTlRfVFJBQ0sgPiAwKSB7XG4gICAgICAgIHJldHVybiAoX0NVUlJFTlRfVFJBQ0sgLSAxKTtcbiAgICB9XG5cblx0cmV0dXJuIChfVFJBQ0tfQ09VTlQgLSAxKTtcbn1cblxuLyoqXG4gKiBMb2FkIHRoZSBwbGF5bGlzdCB3aXRoIGFuIG9wdGlvbmFsIHBsYXlsaXN0IHBhdGhcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGwgUGF0aCB0byBsb2FkIHBsYXlsaXN0IGZyb20gdmlhIEFKQVhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbiBhc3luYyBmdW5jdGlvbiBfbG9hZFBsYXlsaXN0KHBsKSB7XG5cdGlmICh0eXBlb2YgcGwgIT0gJ3N0cmluZycgfHwgcGwubGVuZ3RoIDw9IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vIHBsYXlsaXN0IGhhcyBiZWVuIGRlZmluZWQhJyk7XG5cdH1cblxuXHRfUExBWUVSX0ZVTkNTLmFqYXhTcGlubmVyLnRvZ2dsZSh0cnVlKTtcblx0X3RvZ2dsZVBsYXllckJ1dHRvbnModHJ1ZSk7XG5cdF9QTEFZRVJfRlVOQ1MucGxheWxpc3RCdG4ubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuXHRyZXR1cm4gYXdhaXQgSHR0cENsaWVudC5nZXQocGwpO1xufVxuXG4vKipcbiAqIEhhbmRsZSBjbGlja3Mgb24gYSBzaW5nbGUgcGxheWxpc3QuXG4gKlxuICogQHBhcmFtIHtET00gRXZlbnR9IGUgXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIF9wbGF5bGlzdEJ1dHRvbkhhbmRsZXIoZSkge1xuXHRjb25zdCBwbHUgPSBlLnRhcmdldC5kYXRhc2V0LnBsYXlsaXN0O1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBwbGF5bGlzdFVybCA9IG5ldyBVUkwocGx1KTtcblx0XHRjb25zdCBwbCA9IGF3YWl0IF9sb2FkUGxheWxpc3QocGxheWxpc3RVcmwuaHJlZik7XG5cdFx0X2hhbmRsZVBsYXlsaXN0KHBsKTtcblx0fVxuXHRjYXRjaCAoZXhjZXB0aW9uKSB7XG5cdFx0Y29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuXHR9XG59XG5cbi8qKlxuICogSGFuZGxlIGEgcGxheWxpc3QgYWZ0ZXIgaXQgbG9hZHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IEpTT04gUGxheWxpc3QuXG4gKiBAcmV0dXJucyB7Vm9pZH1cbiAqL1xuIGZ1bmN0aW9uIF9oYW5kbGVQbGF5bGlzdChwbCkge1xuXHRwbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGwpKTtcblxuXHRfdG9nZ2xlUGxheWVyQnV0dG9ucyhmYWxzZSk7XG5cblx0X1BMQVlMSVNUID0gcGw7XG5cdF91cGRhdGVTY3JlZW5UaXRsZShfUExBWUxJU1QubmFtZSk7XG5cdF9UUkFDS19DT1VOVCA9IF9QTEFZTElTVC50cmFja3MubGVuZ3RoO1xuXHRfc2V0VXBQbGF5bGlzdERpc3BsYXkoKTtcblx0X3BvcHVsYXRlVGltZURpc3BsYXkoJzAwOjAwJywgJzAwOjAwJyk7XG5cblx0Y29uc3QgY29udGVudCA9IHBsLmluZm8gPyBgPHA+JHtwbC5pbmZvfTwvcD5gIDogJyc7XG5cdF9wb3B1bGF0ZUluZm9Cb3hDb250ZW50KGNvbnRlbnQpO1xufVxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIGxvYWRpbmcgYWxsIHBsYXlsaXN0cyBkZWZpbmVkIGFuZFxuICogaW1wb3J0ZWQgaW4gJ3BsYXlsaXN0cycgbmFtZWQgaW1wb3J0LiBUaGlzIHJlbmRlcnNcbiAqIGEgbGlzdCBvZiBwbGF5bGlzdCBidXR0b25zIGluIF9QTEFZRVJfRlVOQ1MucGxheWxpc3RCb3guXG4gKlxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9oYW5kbGVBbGxQbGF5bGlzdHMoKSB7XG5cdGlmICh0eXBlb2YgcGxheWxpc3RzID09ICd1bmRlZmluZWQnIHx8IHBsYXlsaXN0cyA9PSBudWxsIHx8IHBsYXlsaXN0cy5sZW5ndGggPD0gMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignTm8gcGxheWxpc3RzIGZvdW5kISBTZWUgcHVibGljL2pzL1dlYkF1ZGlvUGxheWVyL2NvbXBvbmVudHMvcGxheWxpc3RzLmpzJyk7XG5cdH1cblxuICAgIF9QTEFZRVJfRlVOQ1MucGxheWxpc3RCdG4ubm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0X3VwZGF0ZVNjcmVlblRpdGxlKCdQbGF5bGlzdHMnKTtcblx0X2VtcHR5KF9QTEFZRVJfRlVOQ1MucGxheWxpc3RCb3gpO1xuXG5cdGZvciAoY29uc3QgcGxheWxpc3Qgb2YgcGxheWxpc3RzKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyhwbGF5bGlzdCk7XG5cdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG5cdFx0YnV0dG9uLmFwcGVuZENoaWxkKF9jcmVhdGVUZXh0Tm9kZShwbGF5bGlzdC5uYW1lKSk7XG5cdFx0YnV0dG9uLmRhdGFzZXQucGxheWxpc3QgPSBwbGF5bGlzdC51cmw7XG5cdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwbGF5bGlzdC5uYW1lKTtcblx0XHRfYXR0YWNoRXZlbnRzKGJ1dHRvbiwgJ2NsaWNrJywgX3BsYXlsaXN0QnV0dG9uSGFuZGxlcik7XG5cdFx0bGkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0XHRfUExBWUVSX0ZVTkNTLnBsYXlsaXN0Qm94LmFwcGVuZENoaWxkKGxpKTtcblx0fVxufVxuXG4vKipcbiAqIEV2ZW50IGhhbmRsZXIgZm9yIGVuZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudCBvYmplY3RcbiAqIEByZXR1cm5zIHtWb2lkfVxuICovXG5mdW5jdGlvbiBfaGFuZGxlRW5kT2ZBdWRpb0V2ZW50KGUpIHtcblx0aWYgKF9BVVRPX1BMQVkpIHtcblx0XHRfcmVtb3ZlUGxheWluZ0NsYXNzRnJvbUFsbCgpO1xuXHRcdF9sb2FkVHJhY2soX2dldE5leHRUcmFjaygpKTtcblx0fVxufVxuXG4vKipcbiAqIEV2ZW50IGhhbmRsZXIgZm9yIHBhdXNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlIEV2ZW50IG9iamVjdFxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9oYW5kbGVQYXVzZUV2ZW50KGUpIHtcblx0X1BMQVlFUlJPT1QuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xuXHRfUExBWUVSUk9PVC5jbGFzc0xpc3QuYWRkKCdwYXVzZWQnKTtcbn1cblxuLyoqXG4gKiBFdmVudCBoYW5kbGVyIGZvciBBSkFYIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RE9NfSBlIEV2ZW50IG9iamVjdFxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9oYW5kbGVQbGF5aW5nRXZlbnQoZSkge1xuXHR2YXIgcGFyZW50ID0gX1BMQVlFUl9GVU5DU1xuXHRcdC5wbGF5bGlzdEJveFxuXHRcdC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS10cmFja251bT1cIiR7X0NVUlJFTlRfVFJBQ0t9XCJdYClcblx0XHQucGFyZW50Tm9kZTtcblxuXHRfUExBWUVSUk9PVC5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZWQnKTtcblx0X1BMQVlFUlJPT1QuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xuXHRwYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjdXJyZW50Jyk7XG59XG5cbi8qKlxuICogRXZlbnQgaGFuZGxlciBmb3IgX1dFQl9BVURJTyBsb2FkaW5nIHByb2dyZXNzLlxuICpcbiAqIEBwYXJhbSB7RE9NfSBlIEV2ZW50IG9iamVjdFxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9oYW5kbGVQcm9ncmVzc0V2ZW50KGUpIHtcblx0Y29uc3QgYnVmZmQgPSBlLnRhcmdldC5idWZmZXJlZDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZC5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLmNlaWwocGFyc2VJbnQoKGJ1ZmZkLmVuZChpKSAvIGJ1ZmZkLmR1cmF0aW9uKSAqIDEwMCkpO1xuXHRcdF9QTEFZRVJfRlVOQ1MubG9hZFByb2dyZXNzLnNldFdpZHRoKHBlcmNlbnRhZ2UgKyAnJScpO1xuXHR9XG59XG5cbi8qKlxuICogRXZlbnQgaGFuZGxlciBmb3IgX1dFQl9BVURJTyB0aW1lIHVwZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RPTX0gZSBFdmVudCBvYmplY3RcbiAqIEByZXR1cm5zIHtWb2lkfVxuICovXG5mdW5jdGlvbiBfaGFuZGxlVGltZVVwZGF0ZUV2ZW50KGUpIHtcblx0Ly8gQ2FsY3VsYXRlICYgc2V0IHBsYXkgdGltZSBkaXNwbGF5IGNvdW50aW5nIGJhY2t3YXJkc1xuXHRjb25zdCBkdXIgPSBlLnRhcmdldC5kdXJhdGlvbjtcblx0Y29uc3QgdGltZSA9IGUudGFyZ2V0LmN1cnJlbnRUaW1lO1xuXHRjb25zdCB0b3RhbFNlY29uZHNSZW1haW5pbmcgPSBwYXJzZUludChkdXIgLSB0aW1lLCAxMCk7XG5cblx0aWYgKGlzTmFOKHRvdGFsU2Vjb25kc1JlbWFpbmluZykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRfcG9wdWxhdGVUaW1lRGlzcGxheShfY29udmVydFNlY29uZHNUb1RpbWUodGltZSksIF9jb252ZXJ0U2Vjb25kc1RvVGltZSh0b3RhbFNlY29uZHNSZW1haW5pbmcsIHRydWUpKTtcblxuXHQvLyBTZXQgbmV3IHNlZWsgaGFuZGxlIHBvc2l0aW9uXG5cdF9QTEFZRVJfRlVOQ1Muc2Vla0hhbmRsZUJveC5zZXRQb3NpdGlvbih0aW1lKTtcbn1cblxuZnVuY3Rpb24gX3BvcHVsYXRlSW5mb0JveENvbnRlbnQoY29udGVudCkge1xuXHRfZW1wdHkoX1BMQVlFUl9GVU5DUy5pbmZvU2Nyb2xsQ29udGVudCk7XG5cblx0X1BMQVlFUl9GVU5DUy5pbmZvU2Nyb2xsQ29udGVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRfUExBWUVSX0ZVTkNTLmluZm9CdXR0b24uZGlzYWJsZShmYWxzZSk7XG59XG5cbi8qKlxuICogTG9hZCB0aGUgY3VycmVudCB0cmFjayBhbmQgYW55IGluZm9cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY3QgVGhlIGN1cnJlbnQgdHJhY2sgbnVtYmVyIHVzaW5nIGEgMC1iYXNlZCBpbmRleC5cbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9sb2FkVHJhY2soY3QpIHtcblx0X3BhdXNlKCk7XG5cdF9QTEFZRVJfRlVOQ1Muc2Vla0hhbmRsZUJveC50b2dnbGVFbmFibGUodHJ1ZSk7XG5cdF9QTEFZRVJfRlVOQ1MubG9hZFByb2dyZXNzLnJlc2V0KCk7XG5cdF9DVVJSRU5UX1RSQUNLID0gcGFyc2VJbnQoY3QpO1xuXHRfV0VCX0FVRElPLnNyYyA9IF9QTEFZTElTVC50cmFja3NbX0NVUlJFTlRfVFJBQ0tdLnBhdGg7XG5cblx0Ly8gRW5hYmxlIHRyYWNrIGluZm8gYnV0dG9uIGlmIHRyYWNrIGhhcyBpbmZvXG5cdGlmIChfUExBWUxJU1QudHJhY2tzW19DVVJSRU5UX1RSQUNLXS5pbmZvLmxlbmd0aCA8PSAwKSB7XG5cdFx0X1BMQVlFUl9GVU5DUy5pbmZvQnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IGNvbnRlbnQgPVxuXHRcdFx0YDxwPiR7X1BMQVlMSVNULnRyYWNrc1tfQ1VSUkVOVF9UUkFDS10udGl0bGV9PC9wPlxuXHRcdFx0JHtfUExBWUxJU1QudHJhY2tzW19DVVJSRU5UX1RSQUNLXS5pbmZvfWA7XG5cdFx0X3BvcHVsYXRlSW5mb0JveENvbnRlbnQoY29udGVudCk7XG5cdH1cblxuXHRfV0VCX0FVRElPLmxvYWQoKTtcbn1cblxuLyoqXG4gKiBQYXVzZSBoYW5kbGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGUgRXZlbnQgb2JqZWN0XG4gKiBAcmV0dXJucyB7Vm9pZH1cbiAqL1xuZnVuY3Rpb24gX3BhdXNlKGUpIHtcblx0X1dFQl9BVURJTy5wYXVzZSgpO1xufVxuXG4vKipcbiAqIFBsYXkgaGFuZGxlciBmb3IgX1dFQl9BVURJT1xuICpcbiAqIEBwYXJhbSB7RE9NfSBlIEV2ZW50IG9iamVjdFxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9wbGF5KGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRfUExBWUVSX0ZVTkNTLnNlZWtIYW5kbGVCb3gudG9nZ2xlRW5hYmxlKGZhbHNlKTtcblx0X1BMQVlFUl9GVU5DUy5zZWVrSGFuZGxlQm94LnNldE1heCgpO1xuXHRfV0VCX0FVRElPLnBsYXkoKTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHRpbWUgZGlzcGxheXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY3VycmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHJlbWFpblxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9wb3B1bGF0ZVRpbWVEaXNwbGF5KGN1cnJlbnQsIHJlbWFpbikge1xuXHRfZW1wdHkoX1BMQVlFUl9GVU5DUy5yZW1haW5pbmdUaW1lKVxuXHRcdC5hcHBlbmRDaGlsZChfY3JlYXRlVGV4dE5vZGUocmVtYWluKSk7XG5cdF9lbXB0eShfUExBWUVSX0ZVTkNTLmN1cnJlbnRUaW1lRGlzcGxheSlcblx0XHQuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRleHROb2RlKGN1cnJlbnQpKTtcbn1cblxuLyoqXG4gKiBTZXQgYWxsIHRyYWNrIGluIGRpc3BsYXkgbGlzdCB0byBOT1QgYWN0aXZlIGJ5IHJlbW92aW5nIHRoZSBjbGFzc1xuICpcbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF9yZW1vdmVQbGF5aW5nQ2xhc3NGcm9tQWxsKCkge1xuXHRfUExBWUVSUk9PVC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XG5cdGNvbnN0IGN1cnJlbnQgPSBfUExBWUVSX0ZVTkNTLnBsYXlsaXN0Qm94LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2N1cnJlbnQnKVswXTtcblxuXHRpZiAoY3VycmVudCkge1xuXHRcdGN1cnJlbnQucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIF9zZXRBdWRpb09iamVjdChhdWRpbyA9IG51bGwpIHtcblx0X1dFQl9BVURJTyA9IGF1ZGlvID8/IG5ldyBBdWRpbygpO1xufVxuXG5mdW5jdGlvbiBfaGFuZGxlTG9hZFRyYWNrKGUpIHtcblx0X3JlbW92ZVBsYXlpbmdDbGFzc0Zyb21BbGwoKTtcblx0X2xvYWRUcmFjayhwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhY2tudW0nKSkpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIHBsYXlsaXN0IGRpc3BsYXkgYW5kIGNvbm5lY3QgdG8gYnV0dG9uIGNsaWNrIGV2ZW50XG4gKlxuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZnVuY3Rpb24gX3NldFVwUGxheWxpc3REaXNwbGF5KCkge1xuXHQvLyBDbGVhciBsaXN0IGNvbnRlbnRzXG5cdF9lbXB0eShfUExBWUVSX0ZVTkNTLnBsYXlsaXN0Qm94KTtcblxuXHRmb3IgKGxldCB4ID0gMDsgeCA8IF9QTEFZTElTVC50cmFja3MubGVuZ3RoOyB4KyspIHtcblx0XHRjb25zdCB0cmFjayA9IF9QTEFZTElTVC50cmFja3NbeF07XG5cdFx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdGNvbnN0IHNob3J0VGV4dCA9IF9tYWtlU2hvcnRUaXRsZSh0cmFjay50aXRsZSk7XG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgYnV0dG9uIG5vZGUgJiBkcmVzcyBpdCB1cC5cblx0XHRjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRidG4uYXBwZW5kQ2hpbGQoX2NyZWF0ZVRleHROb2RlKHNob3J0VGV4dCkpO1xuXHRcdGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhY2tudW0nLCB4KTtcblx0XHQvLyBBZGQgdG8gbGlzdCBpdGVtXG5cdFx0bGkuYXBwZW5kQ2hpbGQoYnRuKTtcblx0XHQvLyBBZGQgdG8gbGlzdFxuXHRcdF9QTEFZRVJfRlVOQ1MucGxheWxpc3RCb3guYXBwZW5kQ2hpbGQobGkpO1xuXHRcdC8vIEFkZCBldmVudCBoYW5kbGVyXG5cdFx0X2F0dGFjaEV2ZW50cyhidG4sICdjbGljaycsIF9oYW5kbGVMb2FkVHJhY2spO1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlIHNob3J0ZW5lZCB0aXRsZVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gU2hvcnRlbmVkIHRpdGxlXG4gKi9cbmZ1bmN0aW9uIF9tYWtlU2hvcnRUaXRsZSh0aXRsZVN0cikge1xuXHRjb25zdCBjdXRvZmYgPSA1MDtcblxuXHRpZiAodGl0bGVTdHIubGVuZ3RoIDw9IGN1dG9mZikge1xuXHRcdHJldHVybiB0aXRsZVN0cjtcblx0fVxuXG5cdGNvbnN0IGN1dCA9IHRpdGxlU3RyLnN1YnN0cigwLCBjdXRvZmYpO1xuXHRjb25zdCBzcGxpdCA9IGN1dC5zcGxpdCgnICcpO1xuXHRjb25zdCBwb3AgPSBzcGxpdC5wb3AoKTtcblxuXHRyZXR1cm4gYCR7c3BsaXQuam9pbignICcpfS4uLmA7XG59XG5cbi8qKlxuICogRW5hYmxlL2Rpc2FibGUgYWxsIHBsYXllciBidXR0b25zXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBzdGF0ZVxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF90b2dnbGVQbGF5ZXJCdXR0b25zKHN0YXRlKSB7XG5cdGZvciAoY29uc3Qgbm9kZSBvZiBfUExBWUVSX0NPTlRST0xfTk9ERVMpIHtcblx0XHRub2RlLmRpc2FibGVkID0gc3RhdGU7XG5cdH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHRpdGxlIHRleHRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIE5ldyB0aXRsZVxuICogQHJldHVybnMge1ZvaWR9XG4gKi9cbmZ1bmN0aW9uIF91cGRhdGVTY3JlZW5UaXRsZShzdHIpIHtcblx0X1BMQVlFUl9GVU5DUy5zY3JlZW5UaXRsZS5pbm5lckhUTUwgPSBzdHI7XG59XG4iLCIvLyBpbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSdcblxuZXhwb3J0IGNvbnN0IGdldCA9IGFzeW5jIChlbmRwb2ludCwgcXVlcnlQYXJhbXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IFVSTCA9IGVuZHBvaW50O1xuXG4gICAgaWYgKHF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHFwID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVBhcmFtcyk7XG4gICAgICAgIFVSTCA9IGAke1VSTH0/JHtxcC50b1N0cmluZ31gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJydcbiAgICAgICAgfSksXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIG1vZGU6ICdzYW1lLW9yaWdpbidcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChVUkwsIHJlcXVlc3RQYXJhbXMpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG59XG4iLCJleHBvcnQgY29uc3QgcGxheWxpc3RzID0gW1xuXHR7XG5cdFx0XCJuYW1lXCI6XCJFYXN0IDNyZCBTdHJlZXQgRW5zZW1ibGUgU2FtcGxlc1wiLFxuXHRcdFwidXJsXCI6YCR7cHJvY2Vzcy5lbnYuUExBWUxJU1RfQkFTRV9VUkx9L3BsYXlsaXN0cy9lYXN0LXRoaXJkLXN0Lmpzb25gXG5cdH0sXG5cdHtcblx0XHRcIm5hbWVcIjpcIlByYWpuYSBTYW1wbGVzXCIsXG5cdFx0XCJ1cmxcIjpgJHtwcm9jZXNzLmVudi5QTEFZTElTVF9CQVNFX1VSTH0vcGxheWxpc3RzL3ByYWpuYS5qc29uYFxuXHR9LFxuICAgIHtcblx0XHRcIm5hbWVcIjpcIlp1ayAtIEFuIEV2ZW5pbmcgaW4gdGhlIENsb3Vkc1wiLFxuXHRcdFwidXJsXCI6YCR7cHJvY2Vzcy5lbnYuUExBWUxJU1RfQkFTRV9VUkx9L3BsYXlsaXN0cy96dWsuanNvbmBcblx0fSxcbiAgICB7XG5cdFx0XCJuYW1lXCI6XCIxOTc1OiBBbiBVbmRlcmdyb3VuZCBFcGljIFNhbXBsZXNcIixcblx0XHRcInVybFwiOmAke3Byb2Nlc3MuZW52LlBMQVlMSVNUX0JBU0VfVVJMfS9wbGF5bGlzdHMvMTk3NS5qc29uYFxuXHR9LFxuICAgIHtcblx0XHRcIm5hbWVcIjpcIlJvdW5kIFJvYmluIFNhbXBsZVwiLFxuXHRcdFwidXJsXCI6YCR7cHJvY2Vzcy5lbnYuUExBWUxJU1RfQkFTRV9VUkx9L3BsYXlsaXN0cy9yb3VuZC1yb2Jpbi5qc29uYFxuXHR9LFxuICAgIHtcblx0XHRcIm5hbWVcIjpcIk1hcmltLWJhc3MgU2FtcGxlc1wiLFxuXHRcdFwidXJsXCI6YCR7cHJvY2Vzcy5lbnYuUExBWUxJU1RfQkFTRV9VUkx9L3BsYXlsaXN0cy9tYXJpbS1iYXNzLmpzb25gXG5cdH0sXG4gICAge1xuXHRcdFwibmFtZVwiOlwiQWNvdXN0aWMgTWF5aGVtIFNhbXBsZVwiLFxuXHRcdFwidXJsXCI6YCR7cHJvY2Vzcy5lbnYuUExBWUxJU1RfQkFTRV9VUkx9L3BsYXlsaXN0cy9hY291c3RpYy1tYXloZW0uanNvbmBcblx0fVxuXVxuIiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vV2ViQXVkaW9QbGF5ZXIuanMnO1xuXG53aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICBjb25zb2xlLmRlYnVnKDg3NjU0Myk7XG4gICAgY29uc3QgcGxheWVyTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1ib29tLWJveCcpO1xuICAgIGluaXQocGxheWVyTm9kZSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIGRlZmluZShHcCwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gIGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvbik7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luaXQuanNcIik7XG4iLCIiXSwibmFtZXMiOlsiSHR0cENsaWVudCIsInBsYXlsaXN0cyIsIl9BVURJT19DT0RFQ1NfTUlNRVMiLCJtcDMiLCJtcDQiLCJvZ2ciLCJ3ZWJtIiwid2F2IiwiX1dFQl9BVURJTyIsIl9BVVRPX1BMQVkiLCJfQ1VSUkVOVF9UUkFDSyIsIl9IVE1MNV9TVVBQT1JUIiwiX1BMQVlFUlJPT1QiLCJfUExBWUVSX0NPTlRST0xfTk9ERVMiLCJfUExBWUxJU1QiLCJfVFJBQ0tfQ09VTlQiLCJfU0FWRURWT0xVTUUiLCJfUExBWUVSX1BBUlRTX1NFTEVDVE9SUyIsImFqYXhTcGlubmVyIiwiYXV0b3BsYXlCdG4iLCJjdXJyZW50VGltZURpc3BsYXkiLCJpbmZvQnV0dG9uIiwiaW5mb1NjcmVlbiIsImluZm9TY3JvbGwiLCJpbmZvU2Nyb2xsQ29udGVudCIsImxvYWRQcm9ncmVzcyIsIm11dGVCdXR0b24iLCJuZXh0VHJhY2tCdG4iLCJwbGF5QnRuIiwicGxheWxpc3RCb3giLCJwbGF5bGlzdEJ0biIsInByZXZUcmFja0J0biIsInJlbWFpbmluZ1RpbWUiLCJzZWVrSGFuZGxlQm94Iiwic2NyZWVuVGl0bGUiLCJ1c2VyU2NyZWVuIiwidm9sdW1lU2xpZGVyTXV0ZSIsInZvbHVtZUJ1dHRvbiIsInZvbHVtZVNsaWRlciIsIl9QTEFZRVJfRlVOQ1MiLCJ2ZXJzaW9uIiwiaW5pdCIsInBsYXllciIsImF1ZGlvIiwiRXJyb3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJub2RlIiwic2V0UG9zaXRpb24iLCJkaXNhYmxlIiwiY29uc29sZSIsImVycm9yIiwiZ2V0Tm9kZUJ5Q2xhc3MiLCJjb250ZXh0IiwiY2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaWQiLCJfc2V0VXBGdW5jdGlvbmFsaXR5IiwidG9nZ2xlIiwic3RhdGUiLCJyZW1vdmUiLCJoYW5kbGVCdXR0b24iLCJlIiwiZGlzYWJsZWQiLCJjbG9zZSIsImZhc3QiLCJzZXRUaW1lb3V0Iiwib3BlbiIsImNvbnRhaW5zIiwicmVzZXQiLCJzZXRXaWR0aCIsInNldEZ1bGxXaWR0aCIsInciLCJzdHlsZSIsIndpZHRoIiwicGF1c2VkIiwiaGFuZGxlU2luZ2xlQ2xpY2siLCJjdXJyZW50VGltZSIsImhhbmRsZURibENsaWNrIiwiaGFuZGxlSW5wdXQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRvZ2dsZUVuYWJsZSIsInNldE1heCIsInNldEF0dHJpYnV0ZSIsInNlZWthYmxlIiwiZW5kIiwidmFsIiwic3RhdHVzIiwidG9nZ2xlQWN0aXZlIiwidG9nZ2xlTXV0ZSIsIm11dGVkIiwidm9sdW1lIiwidiIsIl9sb2FkQWxsUGxheWxpc3RzSGFuZGxlciIsIl9hdHRhY2hFdmVudHMiLCJldmVudCIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FuUGxheVR5cGUiLCJ0eXBlIiwiX2NoZWNrV2ViQXVkaW9BcGlTdXBwb3J0IiwiQXVkaW8iLCJfY29ubmVjdFBsYXllckJ1dHRvbnMiLCJfY2hlY2tNaW1lU3VwcG9ydCIsImFucyIsIngiLCJ4eCIsIl9jb25uZWN0QXVkaW9FdmVudHMiLCJfY29udmVydFNlY29uZHNUb1RpbWUiLCJzIiwicmV2IiwibWlucyIsIk1hdGgiLCJmbG9vciIsInNlY3MiLCJ0aW1lIiwic2VjX251bSIsInBhcnNlSW50IiwiaG91cnMiLCJtaW51dGVzIiwic2Vjb25kcyIsIl9jcmVhdGVUZXh0Tm9kZSIsInN0ciIsImNyZWF0ZVRleHROb2RlIiwiX2VtcHR5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiX2dldE5leHRUcmFjayIsImh5cG9OZXh0IiwiX2dldFByZXZUcmFjayIsIl9sb2FkUGxheWxpc3QiLCJwbCIsImxlbmd0aCIsImdldCIsIl9wbGF5bGlzdEJ1dHRvbkhhbmRsZXIiLCJwbHUiLCJkYXRhc2V0IiwicGxheWxpc3QiLCJwcmV2ZW50RGVmYXVsdCIsInBsYXlsaXN0VXJsIiwiVVJMIiwiaHJlZiIsIl9oYW5kbGVQbGF5bGlzdCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWUiLCJ0cmFja3MiLCJjb250ZW50IiwiaW5mbyIsIl9oYW5kbGVBbGxQbGF5bGlzdHMiLCJkZWJ1ZyIsImJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJsaSIsImFwcGVuZENoaWxkIiwidXJsIiwiX2hhbmRsZUVuZE9mQXVkaW9FdmVudCIsIl9oYW5kbGVQYXVzZUV2ZW50IiwiX2hhbmRsZVBsYXlpbmdFdmVudCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJfaGFuZGxlUHJvZ3Jlc3NFdmVudCIsImJ1ZmZkIiwiYnVmZmVyZWQiLCJpIiwicGVyY2VudGFnZSIsImNlaWwiLCJkdXJhdGlvbiIsIl9oYW5kbGVUaW1lVXBkYXRlRXZlbnQiLCJkdXIiLCJ0b3RhbFNlY29uZHNSZW1haW5pbmciLCJpc05hTiIsIl9wb3B1bGF0ZUluZm9Cb3hDb250ZW50IiwiaW5uZXJIVE1MIiwiX2xvYWRUcmFjayIsImN0Iiwic3JjIiwicGF0aCIsInRpdGxlIiwibG9hZCIsIl9wYXVzZSIsInBhdXNlIiwiX3BsYXkiLCJwbGF5IiwiX3BvcHVsYXRlVGltZURpc3BsYXkiLCJjdXJyZW50IiwicmVtYWluIiwiX3JlbW92ZVBsYXlpbmdDbGFzc0Zyb21BbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicmVtb3ZlQXR0cmlidXRlIiwiX3NldEF1ZGlvT2JqZWN0IiwiX2hhbmRsZUxvYWRUcmFjayIsImdldEF0dHJpYnV0ZSIsIl9zZXRVcFBsYXlsaXN0RGlzcGxheSIsInRyYWNrIiwic2hvcnRUZXh0IiwiYnRuIiwiX21ha2VTaG9ydFRpdGxlIiwidGl0bGVTdHIiLCJjdXRvZmYiLCJjdXQiLCJzdWJzdHIiLCJzcGxpdCIsInBvcCIsImpvaW4iLCJfdG9nZ2xlUGxheWVyQnV0dG9ucyIsIl91cGRhdGVTY3JlZW5UaXRsZSIsImVuZHBvaW50IiwicXVlcnlQYXJhbXMiLCJxcCIsIlVSTFNlYXJjaFBhcmFtcyIsInRvU3RyaW5nIiwicmVxdWVzdFBhcmFtcyIsImhlYWRlcnMiLCJIZWFkZXJzIiwibWV0aG9kIiwibW9kZSIsImZldGNoIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJwcm9jZXNzIiwiZW52IiwiUExBWUxJU1RfQkFTRV9VUkwiLCJ3aW5kb3ciLCJvbmxvYWQiLCJwbGF5ZXJOb2RlIiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9