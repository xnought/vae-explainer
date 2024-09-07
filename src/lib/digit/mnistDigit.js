// adapted from myself lmao https://github.com/xnought/introduction-to-autoencoders/blob/main/src/MNIST/components/mnistDigit/MnistDigit.svelte

/**
 * Maps 2d index to 1d flattened array
 *
 * @param data flattened array
 * @param dim unflattened square dimension (i.e if 28x28, dim = 28)
 * @param i index row
 * @param j index column
 * @returns index of the flattened array given by i and j
 */
const map2D = (data, dim, i, j) => data[dim * i + j];

/**
 * Draws one square in color given canvas context
 *
 * @param ctx pointer to canvas context
 * @param color function that returns hex color
 * @param square the width and height (i.e. w and h are 200, square = 200)
 * @param value the array value
 * @param i index row
 * @param j index column
 */
const drawSquare = (ctx, color, square, value, i, j) => {
	ctx.beginPath();
	ctx.rect(i, j, square, square);
	ctx.fillStyle = color(value);
	ctx.fill();
};

/**
 * This function draws an entire image given flattened pixels and square dimension
 *
 * @param ctx pointer to canvas context
 * @param square the width and height (i.e. w and h are 200, square = 200)
 * @param dim unflattened square dimension (i.e if 28x28, dim = 28)
 * @param color function that returns hex color
 * @param data the flattened array
 * @param object? optionally add xOffset and yOffset to move around image
 */
export const drawPixels = (
	ctx,
	square,
	dim,
	color,
	data,
	{ xOffset = 0, yOffset = 0 } = {}
) => {
	const ticks = square / dim;
	// draw all of the squares
	for (let i = 0; i < dim; i++) {
		for (let j = 0; j < dim; j++) {
			const value = map2D(data, dim, i, j);
			const fix = ticks + 1;
			const x = j * ticks + xOffset;
			const y = i * ticks + yOffset;
			drawSquare(ctx, color, fix, value, x, y);
		}
	}
};
