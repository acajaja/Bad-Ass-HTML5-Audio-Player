/* istanbul ignore file */
const _log = (level, msg) => {
    console.log(msg);
}

export const debug = (msg) => {
    _log(1, msg);
}
export const log = (msg) => {
    _log(2, msg);
}
export const error = (msg) => {
    _log(3, msg);
}
export const info = (msg) => {
    _log(4, msg);
}
export const warn = (msg) => {
    _log(5, msg);
}
export const critical = (msg) => {
    _log(6, msg);
}
