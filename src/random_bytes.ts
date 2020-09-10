declare const window: any;

const QUOTA = 65536;
export function randomBytes(length: number): Uint8Array {
    let x = new Uint8Array(length);
    var v = new Uint8Array(length);
    for (let i = 0; i < length; i += QUOTA) {
        window.crypto!.getRandomValues(v.subarray(i, i + Math.min(length - i, QUOTA)));
    }
    for (let i = 0; i < length; i++) {
        x[i] = v[i];
        v[i] = 0;
    }
    return x;
};