#!/bin/bash

NODE_ENV=development webpack && \
mv ./dist/WebAudioPlayer.init.js ./public/js/WebAudioPlayer

exit #?
