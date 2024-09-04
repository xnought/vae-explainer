<script>
	export let width = 200;
	export let height = 400;
	export let trapHeights = [400, 300];

	export let fill = "var(--pink)";
	export let stroke = "";
</script>

<div>
	<svg {width} {height} style="overflow: visible;">
		<polygon
			points="0,{height / 2 - trapHeights[0] / 2} 0,{height / 2 +
				trapHeights[0] / 2} {width}, {height / 2 +
				trapHeights[1] / 2} {width}, {height / 2 - trapHeights[1] / 2}"
			{fill}
			{stroke}
		/>
	</svg>
</div>

<style>
	/*  put stuff here */
</style>
