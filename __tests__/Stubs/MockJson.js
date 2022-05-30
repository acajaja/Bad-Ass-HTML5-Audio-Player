const randomstring = require('randomstring');
const baseTrack = {
    "copyright": "Abc 123",
    "path": "./audio/short-1.mp3",
    "info": '',
    "mime": "audio/mpeg",
    "title": ''
}

const baseJson = {
    "name": '',
    "info": '',
    "tracks": []
}

export const getMockJsonPLaylist = (name, info=true, tracks=1) => {
    let json = Object.assign({}, baseJson);
    json.name = name;
    json.info = '';
    json.tracks = [];

    if (info) {
        json.info = randomstring.generate(64);
    }

    if (typeof(tracks) === 'number' && tracks > 0) {
        let t;
        for (let x = 0; x < tracks; x++) {
            t = Object.assign({}, baseTrack);
            t.title = `Track no. ${x + 1}`;
            t.info = info ? randomstring.generate(128) : '';
            json.tracks.push(t);
        }
    }

    return JSON.parse(JSON.stringify(json));
}
