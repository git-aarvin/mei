export const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
export const darkScheme = matchMedia("(prefers-color-scheme: dark)");
export const boxOf = (element, dx, dy) => {
	const box = element.getBBox();
	return {
		left: box.x + dx,
		right: box.x + box.width + dx,
		top: box.y + dy,
		bottom: box.y + box.height + dy,
	};
};
export const overlaps = (a, b) =>
	a.left < b.right + 4 && a.right > b.left - 4 &&
	a.top < b.bottom + 2 && a.bottom > b.top - 2;
