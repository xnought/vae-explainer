import flowbitePlugin from "flowbite/plugin";

export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f3f3ff",
					100: "#e8e8ff",
					200: "#d5d6ff",
					300: "#b4b3ff",
					400: "#8e88fd",
					500: "#6857fb",
					600: "#5534f3",
					700: "#4623de",
					800: "#3a1cbb",
					900: "#331a9d",
					950: "#1b0d68",
				},
			},
		},
	},

	plugins: [flowbitePlugin],
};
