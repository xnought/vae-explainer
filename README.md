# VAE Explainer

Learn how Variational Autoencoders (VAE) work by visualizing one running in your browser.

## Development

```bash
cd website
pnpm install
pnpm dev
```
which runs the hot-reloading dev server at http://localhost:5173

## TODO

- [x] Learn how VAEs work
- [x] Pick data to reconstruct
- [x] Use or train my own VAE (simplify so no other complications)
- [x] reproduce results with keras and MNIST
	- [x] vanilla ae
	- [x] VAE
- [x] Test what the network needs to look like to work in tfjs
- [x] Show latent variables (2D only) 
- [ ] Design encoder and decoder blocks
- [ ] Show an expanded example of the log trick
- [ ] Show an expanded example of the reparam trick
- [ ] Write a small help article on the different components
- [ ] Train a cooler VAE example with keras and tf (for tfjs conversion later on) (like on LAION art dataset) (if I have time)
## Future Work

Visualizing how VQ-VAEs work would be very interesting especially since they are used so often within image generation models (stable diffusion and other).

## References

- https://www.ibm.com/think/topics/variational-autoencoder#:~:text=Variational%20autoencoders%20(VAEs)%20are%20generative,other%20autoencoders%2C%20such%20as%20denoising.
- https://www.youtube.com/watch?v=9zKuYvjFFS8
- https://arxiv.org/abs/1312.6114 (original VAE paper)
- https://www.youtube.com/watch?v=afNuE5z2CQ8
- https://keras.io/examples/generative/vae/
- https://keras.io/examples/keras_recipes/trainer_pattern/
