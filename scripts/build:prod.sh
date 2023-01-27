#!/bin/bash

npx webpack \
    --config=./webpack.config.js \
    --node-env=production \
    --progress

cp -f ./dist/* ./public/js/WebAudioPlayer

exit $?
