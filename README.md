Bad-Ass-HTML5-Audio-Player
==========================

Unstyled working example:
http://sandboxes.jazzopetry.net/Bad-Ass-HTML5-Audio-Player/

Well, maybe it's not so bad ass, but I really like HTML5 audio and wanted a versatile player for my web site.

The player is designed to use multiple playlists. So the first call is to a playlist of playlists. From there, the user can load one and play the tracks on it.

Subsequent releases will have the option to configure single or multi playlist mode.

The player is written almost purely in JavaScript. I only use Dojo to facilitate the use of AMD and for the AJAX calls. Furthermore, you can create custom builds of Dojo with only the base library and any other modules your code uses.

Therefore, this player will only work in the current browser versions and maybe 1 version back as of this publication date.

Known Bugs:

1. Issue with going back to the playlists menu while audio still playing. 
- Status: needs further debugging to locate the problem(s).

2. I think Webkit on certain mobile devices may be doing weird stuff with the volume/mute stuff.
- Steps to reproduce:
    1. load the player
    2. choose a playlist
    3. don't do anything except play a track.
    4. while audio is playing, hit the volume button and mute the audio.
    5. wait a sec and then un-mute.
    6. check if the volume seems significantly higher.

