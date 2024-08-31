# Variational Autoencoder (VAE) Explainer

Learn how Variational Autoencoders (VAE) work by visualizing one running in your browser.

## Development

```bash
cd website
pnpm install
pnpm dev
```
which runs the hot-reloading dev server at http://localhost:5173

## TODO

- [ ] Learn how VAEs work
- [ ] Pick data to reconstruct
- [ ] Use or train my own VAE (simplify so no other complications)
- [ ] Visualize forward pass in the browser with cool example in an educational way (like [ CNN Explainer ](https://poloclub.github.io/cnn-explainer/))
	- [ ] Data input examples (and custom upload)
	- [ ] Autoencoder bottleneck
	- [ ] Latent neurons and Gaussians
	- [ ] Output and how good the reconstruction is
- [ ] Visualize or create a diagram for how gradient is backpropped  
- [ ] Add Vector Quantized version of everything before
- [ ] Add a vanilla autoencoder to show quality differences/comparison (if I have time)

## References

- https://www.ibm.com/think/topics/variational-autoencoder#:~:text=Variational%20autoencoders%20(VAEs)%20are%20generative,other%20autoencoders%2C%20such%20as%20denoising.
- 