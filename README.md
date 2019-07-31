Bad-Ass-HTML5-Audio-Player
==========================

Well, maybe it's not so bad ass, but I really like HTML5 audio and wanted a versatile player for my web site.

The player is designed to use multiple playlists. So the first call is to a playlist of playlists. From there, the user can load one and play the tracks on it. This player will only work in the current browser versions and 1 version back as of this publication date.

Subsequent releases will have the option to configure single or multi playlist mode.

Because compatibility and compliance is getting better, the player is written almost purely in JavaScript and intended to be used as a module (AMD). I only use Dojo to facilitate the use of AMD and for the AJAX calls. Furthermore, you can create custom builds of Dojo with only the base library and any other modules your code uses.

I also don't like to write HTML with my JavaScript. It's just ugleh! This way, you can actually change the structure of the HTML to suit your needs--as long you keep the same classes & id's--without affecting the functionality. It makes it really easy to create custom skins. I did this for my own site for the desktop & mobile versions of the player. Using mobile detection on the back end, I render a different view for mobile.

Remember: separation of concerns!

Live working example:

http://www.clifjackson.net/music/audio

## Known Bugs:

1. Issue with going back to the playlists menu while audio still playing. Status: needs further debugging to locate the problem(s).

2. I think Webkit on certain mobile devices may be doing weird stuff with the volume/mute stuff. Steps to reproduce:
    1. load the player
    2. choose a playlist
    3. don't do anything except play a track.
    4. while audio is playing, hit the volume button and mute the audio.
    5. wait a sec and then un-mute.
    6. check if the volume seems significantly higher.

## Directory Structure

```
/ - webroot

    /js

        /js/modules - development files

            /js/modules/minified - minified production files

    /json - sample playlists

    /mp3 - sample mp3 files
```

## How-To

##### /index.html

the HTML used for the player and the JavaScript to load it. You can have multiple players on one page by either copying the HTML directly for each player or by using JavaScript to clone the player and generate new instances dynamically. The player root node has the data- attribute data-setup='{"playlists":"json/playlists.json"}'. Set this to wherever you need to.

##### /js/modules/html5-audio-player-0.5.js

player module development code. It is meant to be minified. You could even take out all the debugging pretty easily if you cared.

##### /js/modules/debugger.js

used to debug the code. It is enabled so to disable it go to line 15 of the player module and comment out "D.enableDebug();"

That's about it! Super simple set up.

Load up your page, choose a playlist and hit play!

See /json/*.json for examples of playlist structure/syntax.

## Functionality

The player has the following features/functions:

- play/pause button
- previous track multi tap button: 1 tap = go to beginning of current track. 2 taps = go to previous track.
- next track button
- autoplay button: player keeps playing all tracks in playlist until stopped.
- playlists button: load all playlists, stop audio and reset and disable player controls.
- volume button: tap to open volume slider. also contains a mute button.
- info button: if a track contains information about it this button will be enabled when the track is selected.
- time/progress display: displays elapsed & remaining time along with slider for current position & audio scrubbing.
- detects supported audio type
