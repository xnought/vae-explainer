<img src="public/logo.svg"  width="400"/>

Learn how Variational Autoencoders (VAE) work by visualizing one running in your browser. 

Can operate as an interactive supplement to [@fchollet](https://x.com/fchollet)'s [Variational Autoencoder Keras Example](https://keras.io/examples/generative/vae/) docs.



https://github.com/user-attachments/assets/3569bd6a-ad1a-4d09-9d17-618723ce70e9


## TODO

- [x] Make the drawing better
- [ ] Write small pargraph below on the tool
    - [ ] What is a VAE?
        - [ ] Input, latent, output
        - [ ] Exact computations that make up forward pass
    - [ ] Learning towards a distribution (loss function)
    - [ ] References
- [ ] Create poster from article contents
- [ ] Print poster to hang up at lab

## Development

```bash
cd website
pnpm install
pnpm dev
```
which runs the hot-reloading dev server at http://localhost:5173

## References

- https://keras.io/examples/generative/vae/ (supposed to accompany)
- https://www.ibm.com/think/topics/variational-autoencoder#:~:text=Variational%20autoencoders%20(VAEs)%20are%20generative,other%20autoencoders%2C%20such%20as%20denoising.
- https://www.youtube.com/watch?v=9zKuYvjFFS8
- https://arxiv.org/abs/1312.6114 (original VAE paper)
- https://www.youtube.com/watch?v=afNuE5z2CQ8
- https://keras.io/examples/keras_recipes/trainer_pattern/
