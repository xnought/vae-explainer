import * as tf from "@tensorflow/tfjs";

tf.tidy(() => {
	const model = tf.loadLayersModel("/models/tfjs/model.json");
	model.then((d) => {
		console.log(d);
	});
});
