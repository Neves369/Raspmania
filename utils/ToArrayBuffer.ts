import {decode} from 'base-64';

export function _base64ToArrayBuffer(base64: any) {
    var binary_string = decode(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

