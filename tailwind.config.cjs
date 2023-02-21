const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			fontFamily: {
				markazi: ['Markazi Text', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			colors: {
				primary: {
					green: '#495E57',
					yellow: '#F4CE14'
				},
				secondary: {
					dark: '#EE9972',
					light: '#FBDABB'
				},
				highlight: {
					dark: '#333333',
					light: '#EDEFEE'
				},
				CTA: {}
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
