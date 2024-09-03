<script>
	import { Button } from "flowbite-svelte";
	import { GithubSolid, FilePdfSolid } from "flowbite-svelte-icons";
</script>

<nav>
	<div id="inner">
		<div class="left">
			<img src="logo.svg" alt="logo" />
			<span id="title-desc">
				Interactively run a <b>V</b>ariational <b>A</b>uto<b>e</b>ncoder
				(<b>VAE</b>) in your browser!
			</span>
		</div>
		<div class="right">
			<Button
				size="xs"
				href="https://github.com/xnought/vae-explainer"
				color="dark"
				>Code
				<GithubSolid size="md" class="ml-1" />
			</Button>
			<Button
				size="xs"
				href="https://github.com/xnought/vae-explainer"
				color="dark"
				>Paper
				<FilePdfSolid size="md" class="ml-1" />
			</Button>
		</div>
	</div>
</nav>

<style>
	nav {
		background-color: var(--dark-blue);
	}
	#inner {
		padding: 10px;
		padding-left: 15px;
		display: flex;
		justify-content: space-between;
		height: 60px;
	}
	.left {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.right {
		/* position: fixed;
		top: 10px;
		right: 10px; */
	}
	#title-desc {
		color: ivory;
		font-size: 20px;
		font-weight: 250;
	}
	b {
		font-weight: 700;
	}
	/* #github {
		cursor: pointer;
	} */
</style>
