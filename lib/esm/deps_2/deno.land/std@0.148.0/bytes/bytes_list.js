// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
var _BytesList_len, _BytesList_chunks;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
/**
 * An abstraction of multiple Uint8Arrays
 */
export class BytesList {
    constructor() {
        _BytesList_len.set(this, 0);
        _BytesList_chunks.set(this, []);
    }
    /**
     * Total size of bytes
     */
    size() {
        return __classPrivateFieldGet(this, _BytesList_len, "f");
    }
    /**
     * Push bytes with given offset infos
     */
    add(value, start = 0, end = value.byteLength) {
        if (value.byteLength === 0 || end - start === 0) {
            return;
        }
        checkRange(start, end, value.byteLength);
        __classPrivateFieldGet(this, _BytesList_chunks, "f").push({
            value,
            end,
            start,
            offset: __classPrivateFieldGet(this, _BytesList_len, "f"),
        });
        __classPrivateFieldSet(this, _BytesList_len, __classPrivateFieldGet(this, _BytesList_len, "f") + (end - start), "f");
    }
    /**
     * Drop head `n` bytes.
     */
    shift(n) {
        if (n === 0) {
            return;
        }
        if (__classPrivateFieldGet(this, _BytesList_len, "f") <= n) {
            __classPrivateFieldSet(this, _BytesList_chunks, [], "f");
            __classPrivateFieldSet(this, _BytesList_len, 0, "f");
            return;
        }
        const idx = this.getChunkIndex(n);
        __classPrivateFieldGet(this, _BytesList_chunks, "f").splice(0, idx);
        const [chunk] = __classPrivateFieldGet(this, _BytesList_chunks, "f");
        if (chunk) {
            const diff = n - chunk.offset;
            chunk.start += diff;
        }
        let offset = 0;
        for (const chunk of __classPrivateFieldGet(this, _BytesList_chunks, "f")) {
            chunk.offset = offset;
            offset += chunk.end - chunk.start;
        }
        __classPrivateFieldSet(this, _BytesList_len, offset, "f");
    }
    /**
     * Find chunk index in which `pos` locates by binary-search
     * returns -1 if out of range
     */
    getChunkIndex(pos) {
        let max = __classPrivateFieldGet(this, _BytesList_chunks, "f").length;
        let min = 0;
        while (true) {
            const i = min + Math.floor((max - min) / 2);
            if (i < 0 || __classPrivateFieldGet(this, _BytesList_chunks, "f").length <= i) {
                return -1;
            }
            const { offset, start, end } = __classPrivateFieldGet(this, _BytesList_chunks, "f")[i];
            const len = end - start;
            if (offset <= pos && pos < offset + len) {
                return i;
            }
            else if (offset + len <= pos) {
                min = i + 1;
            }
            else {
                max = i - 1;
            }
        }
    }
    /**
     * Get indexed byte from chunks
     */
    get(i) {
        if (i < 0 || __classPrivateFieldGet(this, _BytesList_len, "f") <= i) {
            throw new Error("out of range");
        }
        const idx = this.getChunkIndex(i);
        const { value, offset, start } = __classPrivateFieldGet(this, _BytesList_chunks, "f")[idx];
        return value[start + i - offset];
    }
    /**
     * Iterator of bytes from given position
     */
    *iterator(start = 0) {
        const startIdx = this.getChunkIndex(start);
        if (startIdx < 0)
            return;
        const first = __classPrivateFieldGet(this, _BytesList_chunks, "f")[startIdx];
        let firstOffset = start - first.offset;
        for (let i = startIdx; i < __classPrivateFieldGet(this, _BytesList_chunks, "f").length; i++) {
            const chunk = __classPrivateFieldGet(this, _BytesList_chunks, "f")[i];
            for (let j = chunk.start + firstOffset; j < chunk.end; j++) {
                yield chunk.value[j];
            }
            firstOffset = 0;
        }
    }
    /**
     * Returns subset of bytes copied
     */
    slice(start, end = __classPrivateFieldGet(this, _BytesList_len, "f")) {
        if (end === start) {
            return new Uint8Array();
        }
        checkRange(start, end, __classPrivateFieldGet(this, _BytesList_len, "f"));
        const result = new Uint8Array(end - start);
        const startIdx = this.getChunkIndex(start);
        const endIdx = this.getChunkIndex(end - 1);
        let written = 0;
        for (let i = startIdx; i < endIdx; i++) {
            const chunk = __classPrivateFieldGet(this, _BytesList_chunks, "f")[i];
            const len = chunk.end - chunk.start;
            result.set(chunk.value.subarray(chunk.start, chunk.end), written);
            written += len;
        }
        const last = __classPrivateFieldGet(this, _BytesList_chunks, "f")[endIdx];
        const rest = end - start - written;
        result.set(last.value.subarray(last.start, last.start + rest), written);
        return result;
    }
    /**
     * Concatenate chunks into single Uint8Array copied.
     */
    concat() {
        const result = new Uint8Array(__classPrivateFieldGet(this, _BytesList_len, "f"));
        let sum = 0;
        for (const { value, start, end } of __classPrivateFieldGet(this, _BytesList_chunks, "f")) {
            result.set(value.subarray(start, end), sum);
            sum += end - start;
        }
        return result;
    }
}
_BytesList_len = new WeakMap(), _BytesList_chunks = new WeakMap();
function checkRange(start, end, len) {
    if (start < 0 || len < start || end < 0 || len < end || end < start) {
        throw new Error("invalid range");
    }
}
//# sourceMappingURL=bytes_list.js.map