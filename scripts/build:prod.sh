#!/bin/bash

# npx terser src/WebAudioPlayer/WebAudioPlayer.js \
#     -o dist/WebAudioPlayer.min.js \
#     -c keep_classnames=true,keep_fnames=true,drop_console=true,ecma=2021,module=true \
#     --source-map

npx webpack \
    --config=./webpack.config.js \
    --node-env=production \
    --progress

cp ./dist/* ./public/js/WebAudioPlayer

exit $?
