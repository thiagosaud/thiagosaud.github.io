import {} from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		color: {
			white: '#ffffff';
			whitesmoke: 'whitesmoke';
			black: '#000000';
			grey: '#b0bec5';
			red: '#f9430a';
			green: '#31af36';
			'black-2': '#171717';
			'blue-1': '#00a3ff';
			'blue-2': '#9cc9f5';
			'grey-2': '#243238';
			'grey-3': '#2d394b';
		};
	}
}
