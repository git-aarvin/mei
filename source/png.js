import { deflate } from "node:zlib";
import { promisify } from "node:util";
const zip = promisify(deflate);
const table = new Uint32Array(256);
for (let index = 0; index < 256; index++) {
	let value = index;
	for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
	table[index] = value >>> 0;
}
const checksum = buffer => {
	let value = 0xffffffff;
	for (let index = 0; index < buffer.length; index++) value = table[(value ^ buffer[index]) & 0xff] ^ (value >>> 8);
	return (value ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
	const body = Buffer.concat([Buffer.from(type, `latin1`), data]),
		result = Buffer.allocUnsafe(body.length + 8);
	result.writeUInt32BE(data.length, 0);
	body.copy(result, 4);
	result.writeUInt32BE(checksum(body), body.length + 4);
	return result;
};
export const encodePng = async ({ pixels, width, height }) => {
	const stride = width * 4, padding = stride + 1, raw = Buffer.allocUnsafe(padding * height);
	for (let row = 0; row < height; row++) {
		raw[row * padding] = 0;
		pixels.copy(raw, row * padding + 1, row * stride, row * stride + stride);
	}
	const header = Buffer.alloc(13);
	header.writeUInt32BE(width, 0);
	header.writeUInt32BE(height, 4);
	header[8] = 8;
	header[9] = 6;
	return Buffer.concat([
		Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
		chunk(`IHDR`, header),
		chunk(`IDAT`, await zip(raw, { level: 3 })),
		chunk(`IEND`, Buffer.alloc(0)),
	]);
};
