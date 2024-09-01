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
- [ ] Train a cooler VAE example with keras and tf (for tfjs conversion later on)
- [ ] Visualize forward pass in the browser with cool example in an educational way (like [ CNN Explainer ](https://poloclub.github.io/cnn-explainer/))
	- [ ] Data input examples (and custom upload)
	- [ ] Autoencoder bottleneck
	- [ ] Latent neurons and Gaussians
	- [ ] Output and how good the reconstruction is

## Future Work

Visualing how VQ-VAEs work would be very insteresting especually since they are used so often within image generation models (stable diffusion and other).

## References

- https://www.ibm.com/think/topics/variational-autoencoder#:~:text=Variational%20autoencoders%20(VAEs)%20are%20generative,other%20autoencoders%2C%20such%20as%20denoising.
- https://www.youtube.com/watch?v=9zKuYvjFFS8
- https://arxiv.org/abs/1312.6114 (original VAE paper)
- https://www.youtube.com/watch?v=afNuE5z2CQ8
