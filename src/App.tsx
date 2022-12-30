import { memo } from 'react';
import Router from 'Router';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';

const Theme: DefaultTheme = {
	color: {
		white: '#ffffff',
		whitesmoke: 'whitesmoke',
		black: '#000000',
		grey: '#b0bec5',
		red: '#f9430a',
		green: '#31af36',
		'black-2': '#171717',
		'blue-1': '#00a3ff',
		'blue-2': '#9cc9f5',
		'grey-2': '#243238',
		'grey-3': '#2d394b',
	},
};

const GlobalStyle = createGlobalStyle`
	body {
		color: ${({ theme }) => theme.color.whitesmoke};
		background-color: ${({ theme }) => theme.color['black-2']};
	}
`;

/**
 * @thiagosaud
 * @description This component is unique in that it controls all main flow components and logic!
 */
function App() {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyle />
			<Router />
		</ThemeProvider>
	);
}

export default memo(App);
