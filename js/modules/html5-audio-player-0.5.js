/**
 * HTML5 JavaScript Audio Player v0.5.
 *
 * Designed to play any supported audio type.
 *
 * @copyright © 2013 Clif Jackson
 * @package HTML5 JavaScript Audio Player
 * @version 0.5
 */
define(
"mods/html5-audio-player-0.5",
["mods/debugger","dojo/_base/xhr"],
function(D,xhr)
{
	/**
	 * Constructor function
	 *
	 * @param {String} playerId
	 * @returns {Void}
	 */
    function AudioPlayer(playerId)
	{
		this.version = '0.5';

		try
		{
			// Set player root element
			var _playerRoot			= document.getElementById(playerId);

			// Set up some private defaults
			var _all_playlists,
            _audio_codecs           = {
                mp3: ['audio/mpeg', 'audio/MPA', 'audio/mpa-robust','audio/mpeg3','audio/x-mpeg-3'],
                mp4: ['audio/aac', 'audio/aacp', 'audio/3gpp', 'audio/3gpp2', 'audio/mp4', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
                ogg: ['application/ogg', 'audio/oga', 'audio/ogg', 'audio/vorbis', 'audio/vorbis-config'],
                webm: ['audio/webm'],
                wav: ['audio/vnd.wave', 'audio/wav', 'audio/wave', 'audio/x-wav']
            },
			_audio_element,
			_browser_test			= typeof Audio,
			_auto_play				= false,
			_can_buffer,
			_current_track          = null,
			_html5_support			= (_browser_test == 'function' || _browser_test == 'object'),
			_playerSetup            = JSON.parse(_playerRoot.getAttribute('data-setup')),
			_player_parts_selectors =
			{
				ajaxSpinner: 'net-stat-box',
				autoplayBtn: 'autoplay-btn',
				currentTimeDisplay: 'current-time',
				infoButton: 'info-button',
				infoScreen: 'info-screen',
				infoScroll: 'info-scroll-box',
				infoScrollContent: 'info-content-box',
				loadProgress: 'loading-bar',
                muteButton: 'mute-button',
				nextTrackBtn: 'next-track-btn',
				playBtn: 'play-btn',
				playlistBox: 'playlist-scroll-box',
				playlistBtn: 'playlist-btn',
				prevTrackBtn: 'prev-track-btn',
				remainingTime: 'remaining-time',
				seekHandleBox: 'seek-handle-box',
				screenTitle: 'screen-title',
				userScreen: 'user-screen',
                volumeSliderMute: 'volume-slider-mute-box',
				volumeButton: 'volume-button',
				volumeSlider: 'volume-slider'
			},
			_player_objects     = {},
			_player_control_nodes		= [],
			_playerObj				= this,
			_playlist               = null,
			_playlists_url          = '',
            _preferredMime          = '',
            _savedVolume            = 0,
			_seeking				= false,
            _touch_click            = document.documentElement.classList.contains('touch'),
            _userDownEvent          = _touch_click ? 'touchstart' : 'mousedown',
			_userUpEvent            = _touch_click ? 'touchend' : 'mouseup',
			_track_count			= 0;

			/**
			 * Private Methods
			 ---------------------------------------------------------------------*/
			/**
			 * 
			 * @param {type} type
			 * @param {type} node
			 * @returns {Void}
			 */
			function _attachEvents(node, event, handler)
			{
				if (typeof node.addEventListener != 'function')
				{
					throw 'Cannot attach events. Client does not support addEventListener method.';
				}
				node.addEventListener(event, handler, false);
			}

            /**
			 * Determine the supported mime type
			 * 
			 * @param {Array} types List of mime types
			 * @returns {Boolean|String} If not false, returns the audio mime.
			 */
			function _checkMimeSupport(types)
			{
				var ans = '';
				for (x in _audio_codecs)
				{
                    for (xx in _audio_codecs[x])
                    {
                        ans = _audio_element.canPlayType(_audio_codecs[x][xx]);

                        if (ans == 'probably' || ans == 'maybe')
                        {
D.debug('Browser says it can "'  + ans + '" play: ' + _audio_codecs[x][xx]);
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
			function _connectAudioEvents()
			{
	D.debug('Connecting audio events...');
				_attachEvents(_audio_element, 'canplay', _play);
				_attachEvents(_audio_element, 'ended', _handleEndOfAudioEvent);
				_attachEvents(_audio_element, 'loadeddata', _player_objects.loadProgress.setFullWidth);
				_attachEvents(_audio_element, 'pause', _handlePauseEvent);
				_attachEvents(_audio_element, 'playing', _handlePlayingEvent);
				_attachEvents(_audio_element, 'progress', _handleProgressEvent);
				_attachEvents(_audio_element, 'timeupdate', _handleTimeUpdateEvent);
	D.debug('Done.');
			}

            /**
			 * Connect player buttons
			 *
			 * @returns {Void}
			 */
			function _connectPlayerButtons()
			{
	D.debug('Connecting player buttons...');
				_attachEvents(_player_objects.autoplayBtn.node, 'click', _player_objects.autoplayBtn.handleButton);
				_attachEvents(_player_objects.infoButton.node, 'click', _player_objects.infoScreen.toggle);
				_attachEvents(_player_objects.nextTrackBtn.node, 'click', _player_objects.nextTrackBtn.handleButton);
				_attachEvents(_player_objects.playBtn.node, 'click', _player_objects.playBtn.handleButton);
				_attachEvents(_player_objects.playlistBtn.node, 'click', _player_objects.playlistBtn.handleButton);
				_attachEvents(_player_objects.prevTrackBtn.node, 'click', _player_objects.prevTrackBtn.handleSingleClick);
				_attachEvents(_player_objects.prevTrackBtn.node, 'dblclick', _player_objects.prevTrackBtn.handleDblClick);
				_attachEvents(_player_objects.seekHandleBox.node, 'input', _player_objects.seekHandleBox.handleInput);
				_attachEvents(_player_objects.muteButton.node, 'click', _player_objects.volumeButton.toggleMute);
                _attachEvents(_player_objects.volumeButton.node, 'click', _player_objects.volumeSliderMute.toggle);
				_attachEvents(_player_objects.volumeSlider.node, 'input', _player_objects.volumeSlider.handleInput);
	D.debug('Done.');
			}

            /**
			 * Convert seconds to mins:secs format
			 *
			 * @param {Number} s Current play time in seconds
			 * @param {Boolean} rev Reverse the time
			 * @returns {String}
			 */
			function _convertSecondsToTime(s, rev)
			{
				if (rev === true)
				{
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
			 * @param {type} str
			 * @returns {Text}
			 */
			function _createTextNode(str)
			{
				return document.createTextNode(str);
			}

            /**
			 * 
			 * @param {type} node
			 * @returns {Void}
			 */
			function _empty(node)
			{
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
			function _getNextTrack()
			{
				var hypoNext = _current_track + 1;

				if (hypoNext < _track_count)
                {
                    return hypoNext;
                }

				return 0;
			}

            /**
			 * 
			 * @param {String} className
			 * @returns {object} DOMNode|null
			 */
			function _getNodeByClass(className)
			{
				var node = _playerRoot.getElementsByClassName(className);

				if (node.length > 0)
				{
					return node[0];
				}

				return null;
			}

            /**
			 * The previous track or the last track
			 *
			 * @return {Number} New track number
			 */
			function _getPrevTrack()
			{
				if (_current_track > 0)
                {
                    return (_current_track - 1);
                }

				return (_track_count - 1);
			}

            /**
			 * Handler for loading all playlists
			 *
			 * @param {Object} json response from server
			 * @returns {Void}
			 */
			function _handleAllPlaylists(json)
			{
				if (json == null || typeof json.playlists == 'undefined' || json.playlists.length <= 0)
				{
					throw 'No playlists found!';
				}
                _player_objects.playlistBtn.node.classList.add('active');
				_updateScreenTitle('Playlists');
				_all_playlists = json.playlists;
				_empty(_player_objects.playlistBox);

				for (x in json.playlists)
				{
					var button = document.createElement('button'),
					li = document.createElement('li');

					button.appendChild(_createTextNode(json.playlists[x].name));
					button.setAttribute('data-playlist', json.playlists[x].url);
					li.appendChild(button);
					_player_objects.playlistBox.appendChild(li);
					_attachEvents(button, 'click', function(e)
					{
						_playerObj.loadPlaylist(this.getAttribute('data-playlist'));
					});
				}
	D.debug(json.playlists);
	D.debug('Done.');
			}

            /**
			 * Event handler for end.
             *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _handleEndOfAudioEvent(e)
			{
				if (_auto_play)
				{
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
			function _handlePauseEvent(e)
			{
				_playerRoot.classList.remove('playing');
				_playerRoot.classList.add('paused');
			}

            /**
			 * Event handler for AJAX response.
			 *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _handlePlayingEvent(e)
			{
				var parent = _player_objects.playlistBox.querySelector('button[data-tracknum="' + _current_track + '"]').parentNode;

				_playerRoot.classList.remove('paused');
				_playerRoot.classList.add('playing');
				parent.setAttribute('class', 'current');
			}

            /**
			 * AJAX event handler for loading 1 playlist.
			 *
			 * @param {Object} json Response from server.
			 * @returns {Void}
			 */
			function _handlePlaylist(json)
			{
				if (json == null || typeof json.playlist == 'undefined')
				{
					throw 'Playlist is empty!';
				}
				_playlist = json.playlist;
				_updateScreenTitle(_playlist.name);
				_track_count = _playlist.tracks.length;
				_setUpPlaylistDisplay();
				_togglePlayerButtons(false);
				_populateTimeDisplay('00:00', '00:00');
			}

            /**
			 * Event handler for audio loading progress.
			 *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _handleProgressEvent(e)
			{
				if (_can_buffer) {
					for (var i = 0; i < this.buffered.length; i++)
					{
						var percentage = Math.ceil(parseInt((this.buffered.end(i) / this.duration) * 100));
						_player_objects.loadProgress.setWidth(percentage + '%');
					}
				}
			}

            /**
			 * Event handler for time update.
			 *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _handleTimeUpdateEvent(e)
			{
				// Calculate & set play time display counting backwards
				var dur = this.duration;
				var time = this.currentTime;
				var totalSecondsRemaining = parseInt(dur - time, 10);

				if (!isNaN(totalSecondsRemaining))
				{
					_populateTimeDisplay(_convertSecondsToTime(time), _convertSecondsToTime(totalSecondsRemaining, true));

					// Set new seek handle position
					_player_objects.seekHandleBox.setPosition(time);
				}
			}

            /**
			 * Load the current track and any info
			 *
			 * @param {Number} ct The current track number using a 0-based index.
			 * @return {Void}
			 */
			function _loadTrack(ct)
			{
				_pause();
				_player_objects.seekHandleBox.toggleEnable(true);
				_player_objects.loadProgress.reset();
				_current_track = ct;
	D.debug('Loading track: ' + _playlist.tracks[_current_track].path);
				_audio_element.src = _playlist.tracks[_current_track].path;

				// Enable track info button if track has info
				if (_playlist.tracks[_current_track].info.length <= 0)
				{
	D.debug('Track has NO info.');
					_player_objects.infoButton.toggle(false);
				}
				else
				{
	D.debug('Populating track info...');
					_empty(_player_objects.infoScrollContent);
					_player_objects.infoScrollContent.innerHTML = '<p>' + _playlist.tracks[_current_track].title + '</p>' + _playlist.tracks[_current_track].info;
					_player_objects.infoButton.toggle(true);
				}

				_audio_element.load();
			}

			/**
			 * Pause handler
			 *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _pause(e)
			{
	D.debug('Pausing.');
				_audio_element.pause();
			}

            /**
			 * Play handler
			 *
			 * @param {Object} e Event object
			 * @returns {Void}
			 */
			function _play(e)
			{
	D.debug('Playing.');
				_player_objects.seekHandleBox.toggleEnable(false);
				_player_objects.seekHandleBox.setMax();
				_audio_element.play();
			}

            /**
			 * Set the time displays
			 *
			 * @param {Number} current
			 * @param {Number} remain
			 * @returns {Void}
			 */
			function _populateTimeDisplay(current, remain)
			{
				_empty(_player_objects.remainingTime).appendChild(_createTextNode(remain));
				_empty(_player_objects.currentTimeDisplay).appendChild(_createTextNode(current));
			}

            /**
			 * Set all track in display list to NOT active by removing the class
			 *
			 * @return {Void}
			 */
			function _removePlayingClassFromAll()
			{
D.debug('Removing classes...');
				_playerRoot.classList.remove('playing');
				var current = _player_objects.playlistBox.getElementsByClassName('current')[0];

				if (current)
				{
					current.removeAttribute('class');
				}
			}

            /**
			 * Initialize the playlist display and connect to button click event
			 *
			 * @return {Void}
			 */
			function _setUpPlaylistDisplay()
			{
				// Clear list contents
				_empty(_player_objects.playlistBox);

				for (var x=0; x < _playlist.tracks.length; x++)
				{
					var li = document.createElement("li"),
					/**
					 * Create shortened title
					 *
					 * @return {String} Shortened title
					 */
					shortText = (function() {
						var cutoff = 50;
						if (_playlist.tracks[x].title.length <= cutoff)
						{
							return _playlist.tracks[x].title;
						}
						else
						{
							var cut = _playlist.tracks[x].title.substr(0, cutoff),
							split = cut.split(' '),
							pop = split.pop();

							return split.join(' ') + '...';
						}
					})(),
					// Create a new button node & dress it up.
					btn = document.createElement('button');
					btn.appendChild(_createTextNode(shortText));
					btn.setAttribute('data-tracknum', x);
					// Add to list item
					li.appendChild(btn);
					// Add to list
					_player_objects.playlistBox.appendChild(li);
					// Add event handler
					_attachEvents(btn, 'click', function(e)
					{
						_removePlayingClassFromAll();
						_loadTrack(parseInt(this.getAttribute('data-tracknum')));
					});
				}
			}

            /**
			 * Enable/disable one or all player buttons
			 *
			 * @param {Boolean} state
			 * @returns {Void}
			 */
			function _togglePlayerButtons(state)
			{
				for (var x = 0; x < _player_control_nodes.length; x++)
				{
					_player_control_nodes[x].disabled = state;
				}
			}

            /**
			 * Set the title text
			 *
			 * @param {String} str New title
			 * @returns {Void}
			 */
			function _updateScreenTitle(str)
			{
				_player_objects.screenTitle.innerHTML = str;
			}

			/**
			 * Public Methods
			 ---------------------------------------------------------------------*/
			/**
			 * Initialize the player
			 *
			 * @return {Boolean} false on error
			 */
			this.init = function()
			{
D.enableDebug();
D.debug('Initialize HTML5 Audio Player...');
				try {
					if (!_html5_support)
					{
						throw 'HTML5 Audio is not supported on your device :(';
					}

					_audio_element          = new Audio();
					_can_buffer             = !_audio_element.buffered ? false : true;
					_playlists_url          = _playerSetup.playlists;
                    _preferredMime          = _checkMimeSupport();

					_playerRoot.classList.add('paused');

                    if (!_preferredMime)
                    {
                        throw 'There is no audio codec supported for this device.';
                    }

					// Select DOM nodes and populate.
					_player_objects     =
					{
						ajaxSpinner: {
							node: _getNodeByClass(_player_parts_selectors.ajaxSpinner),
							toggle: function(state)
							{
								if (state)
								{
									this.node.classList.add('play');
								}
								else
								{
									this.node.classList.remove('play');
								}
							}
						},
						autoplayBtn: {
							node: _getNodeByClass(_player_parts_selectors.autoplayBtn),
							/**
							 * 
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleButton: function(e)
							{
								if (!_auto_play) {
									_auto_play = true;
									_playerRoot.classList.add('autoplay');
								}
								else {
									_auto_play = false;
									_playerRoot.classList.remove('autoplay');
								}
							}
						},
						currentTimeDisplay: _getNodeByClass(_player_parts_selectors.currentTimeDisplay),
						infoButton: {
							node: _getNodeByClass(_player_parts_selectors.infoButton),
							toggle: function(state)
							{
								if (state)
								{
									this.node.classList.add('has-info');
									this.node.disabled = false;
								}
								else
								{
									this.node.classList.remove('has-info');
									this.node.disabled = true;
								}
							}
						},
						infoScreen:
						{
							node: _getNodeByClass(_player_parts_selectors.infoScreen),
							close: function(fast)
							{
								var myThis = this;
								if (fast)
								{
									this.node.classList.add('fast');
									setTimeout(function()
									{
										myThis.node.classList.remove('fast');
									},500);
								}
								this.node.classList.remove('play');
							},
							open: function()
							{
								this.node.classList.add('play');
							},
							/* Info screen event handler. Scope is within infoButton */
							toggle: function(e)
							{
								if (_player_objects.infoScreen.node.classList.contains('play'))
								{
									_player_objects.infoScreen.close();
                                    this.classList.remove('active');
								}
								else
								{
									_player_objects.infoScreen.open();
                                    this.classList.add('active');
								}
							}
						},
						infoScroll: _getNodeByClass(_player_parts_selectors.infoScroll),
						infoScrollContent: _getNodeByClass(_player_parts_selectors.infoScrollContent),
						loadProgress: {
							node: _getNodeByClass(_player_parts_selectors.loadProgress),
							reset: function()
							{
								this.setWidth('0');
							},
                            /**
                             * Event handler for audio loadeddata event.
                             *
                             * @param {Object} e
                             * @returns {Void}
                             */
                            setFullWidth: function(e)
                            {
                                if (!_can_buffer)
                                {
                                    this.setWidth('100%');
                                }
                            },
							setWidth: function(w)
							{
								this.node.style.width = w;
							}
						},
                        muteButton: {
                            node: _getNodeByClass(_player_parts_selectors.muteButton)
                        },
						nextTrackBtn: {
							node: _getNodeByClass(_player_parts_selectors.nextTrackBtn),
							/**
							 * 
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleButton: function(e)
							{
								_removePlayingClassFromAll();
								_loadTrack(_getNextTrack());
							}
						},
						playBtn: {
							node: _getNodeByClass(_player_parts_selectors.playBtn),
							/**
							 * Event handler for play/pause button.
							 *
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleButton: function(e)
							{
								// For the very first play after page load
								if (_audio_element.paused && _current_track == null)
								{
									_current_track = 0;
									_loadTrack(_current_track);
								}
								else if (_audio_element.paused)
								{
									_play(e);                    
								}
								else
								{
									_pause(e);
								}
							}
						},
						playlistBox: _getNodeByClass(_player_parts_selectors.playlistBox),
						playlistBtn: {
							node: _getNodeByClass(_player_parts_selectors.playlistBtn),
							/**
							 * Event handler for playlist button. Context is itself.
							 *
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleButton: function(e)
							{
							   if (!_audio_element.paused)
							   {
								   _pause();
							   }

							   // Reset doesn't work unless we wait.
							   setTimeout(function()
							   {
                                   _player_objects.volumeSliderMute.close();
								   _player_objects.userScreen.reset();
								   _playerObj.loadAllPlaylists();
							   },
							   100);
							}
						},
						prevTrackBtn: {
							node: _getNodeByClass(_player_parts_selectors.prevTrackBtn),
							/**
							 * Event handler for single click on previous button.
							 *
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleSingleClick: function(e)
							{
								_audio_element.currentTime = 0;
							},
							/**
							 * Event handler for double click on previous button.
							 *
							 * @param {Object} e Event object
							 * @returns {Void}
							 */
							handleDblClick: function(e)
							{
								_removePlayingClassFromAll();
								_loadTrack(_getPrevTrack());
							}
						},
						remainingTime: _getNodeByClass(_player_parts_selectors.remainingTime),
						seekHandleBox: {
							node: _getNodeByClass(_player_parts_selectors.seekHandleBox),
                            /**
                             * Event handler. Context is itself.
                             *
                             * @param {type} e
                             * @returns {undefined}
                             */
							handleInput: function(e)
							{
								_audio_element.currentTime = this.value;
							},
							reset: function()
							{
								this.node.value = 0;
								this.toggleEnable(true);
							},
							setMax: function()
							{
								this.node.setAttribute('max', _audio_element.seekable.end(0));
							},
							setPosition: function(val)
							{
								this.node.value = val;
							},
							toggleEnable: function(status)
							{
								this.node.disabled = status;
							}
						},
						screenTitle: _getNodeByClass(_player_parts_selectors.screenTitle),
						userScreen: {
							node: _getNodeByClass(_player_parts_selectors.userScreen),
							reset: function()
							{
								_player_objects.seekHandleBox.reset();
								_player_objects.infoScreen.close(true);
								_player_objects.loadProgress.reset();
								_populateTimeDisplay('00:00', '00:00');
							}
						},
						volumeButton: {
							node: _getNodeByClass(_player_parts_selectors.volumeButton),
                            toggleActive: function(toggle)
                            {
                                toggle = typeof toggle == 'undefined' ? null : toggle;

                                if (this.node.classList.contains('active') || toggle === false)
                                {
                                    this.node.classList.remove('active');
                                }
                                else
                                {
                                    this.node.classList.add('active');
                                }
                            },
							toggleMute: function(e)
							{
                                // Unmute
								if (_audio_element.muted)
								{
									_audio_element.muted = false;
                                    _player_objects.volumeSlider.setPosition(_savedVolume);
									_playerRoot.classList.remove('muted');
								}
								else
								{
                                    _savedVolume = _audio_element.volume;
									_audio_element.muted = true;
									_player_objects.volumeSlider.setPosition(0);
									_playerRoot.classList.add('muted');
								}
							}
						},
                        volumeSliderMute: {
                            node: _getNodeByClass(_player_parts_selectors.volumeSliderMute),
							close: function()
							{
                                _player_objects.volumeButton.toggleActive(false);
								this.node.classList.remove('play');
							},
							open: function()
							{
                                _player_objects.volumeButton.toggleActive();
								this.node.classList.add('play');
							},
                            /**
                             * Event handler for slider. Context is volume button.
                             *
                             * @param {type} e
                             * @returns {undefined}
                             */
							toggle: function(e)
							{
								if (_player_objects.volumeSliderMute.node.classList.contains('play'))
								{
									_player_objects.volumeSliderMute.close();
								}
								else
								{
									_player_objects.volumeSliderMute.open();
								}
							}
                        },
						volumeSlider: {
							node: _getNodeByClass(_player_parts_selectors.volumeSlider),
							/**
                             * Event handler for slider. Context is itself.
                             *
                             * @param {type} e
                             * @returns {undefined}
                             */
							handleInput: function(e)
							{
								_audio_element.volume = this.value;
							},
							setPosition: function(v)
							{
								this.node.value = v > 1 ? 1 : v;
D.debug('Setting volume: ' + this.node.value);
							}
						}
					};

					_player_control_nodes			=
					[
						_player_objects.autoplayBtn.node,
						_player_objects.playBtn.node,
						_player_objects.nextTrackBtn.node,
						_player_objects.prevTrackBtn.node,
						_player_objects.volumeButton.node,
						_player_objects.volumeSlider.node
					];

                    // Initialize volume
					_player_objects.volumeSlider.setPosition(typeof _playerSetup.volume == 'undefined' ? 1 : _playerSetup.volume);
					// Initialize audio seek position
                    _player_objects.seekHandleBox.setPosition(0);
					_connectPlayerButtons();
					_connectAudioEvents();
					_player_objects.infoButton.toggle(false);
					_player_objects.seekHandleBox.toggleEnable(true);

					_playerObj.loadAllPlaylists();
D.debug('Player initialized!');
				}
				catch(err)
				{
					D.debug(err);
					return false;
				}
			};
			/*
			 * Load a list of playlists from the given source.
			 *
             * @param {string} apl URL for list of all playlists.
			 * @returns {Void}
			 */
			this.loadAllPlaylists = function(apl)
			{
                if (typeof apl == 'string')
                {
                    _playlists_url = apl;
                }

				if (typeof _playlists_url == 'undefined')
				{
					throw 'No URL has been defined for your list of playlists.';
				}
                
				_togglePlayerButtons(true);
				_player_objects.ajaxSpinner.toggle(true);
				_player_objects.infoButton.toggle(false);
D.debug('Load all playlists...');
				var deferred = xhr.get(
				{
                    headers: { "X-Requested-With": null },
					handleAs: 'json',
					load: _handleAllPlaylists,
					url: _playlists_url
				});
				deferred.addCallback(function()
				{
					_player_objects.ajaxSpinner.toggle(false);
				});
			};
			/**
			 * Load the playlist with an optional playlist path
			 *
			 * @param {String} pl Path to load playlist from via AJAX
			 * @return {Boolean}
			 */
			this.loadPlaylist = function(pl)
			{
				if (typeof pl != 'string' || pl.length <= 0)
				{
					throw 'No playlist has been defined!';
				}
	D.debug('Load playlist...');
	D.debug(pl);
				_player_objects.ajaxSpinner.toggle(true);
				_togglePlayerButtons(true);
				_player_objects.playlistBtn.node.classList.remove('active');

				var deferred = xhr.get(
				{
					headers: { "X-Requested-With": null },
					url: pl,
					handleAs: 'json',
					load: _handlePlaylist
				});
				deferred.addCallback(function()
				{
					_player_objects.ajaxSpinner.toggle(false);
				});

				D.debug('Done');
			};

			/* Initialize the player */
			this.init();
		}
		catch(err)
		{
			console.log('Error thrown:', err);
		}
    }

    return function(id)
    {
        new AudioPlayer(id);
    };
});
