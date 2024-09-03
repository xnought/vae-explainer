import * as tf from "@tensorflow/tfjs";

export function sample(code) {
	const [zLogVar, zMean] = tf.split(code, 2, -1); // since the dense(2*latent) gives x[start:half] as log vars and x[half:end] as means
	const zStdDev = tf.exp(zLogVar.mul(0.5)); // e^(1/2 sigma^2) = sigma

	const eps = tf.randomStandardNormal(zMean.shape);
	const z = tf.add(zMean, tf.mul(eps, zStdDev)); // \mu + \sigma * \epsilon    or stddev*N(0, I) + mean

	return [z, zLogVar, zMean];
}

export async function loadModels() {
	const encoder = await tf.loadGraphModel("/models/tfjs/encoder/model.json");
	const decoder = await tf.loadGraphModel("/models/tfjs/decoder/model.json");
	return [encoder, decoder];
}

export function loadImage(url) {
	const img = new Image();
	return new Promise((res, rej) => {
		img.src = url;
		img.onload = () => res(img);
		img.onerror = rej;
	});
}
