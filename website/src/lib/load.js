import * as tf from "@tensorflow/tfjs";

tf.tidy(() => {
	const model = tf.loadGraphModel("/models/tfjs/encoder/model.json");
	model.then((d) => {
		const out = d.predict(tf.ones([1, 784]));
		console.log(tf.sum(out).toString());
	});
});

tf.tidy(() => {
	const model = tf.loadGraphModel("/models/tfjs/decoder/model.json");
	model.then((d) => {
		const out = d.predict(tf.ones([1, 2]));
		console.log(out.sum().toString());
	});
});
