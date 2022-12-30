import { render, screen } from '@testing-library/react';
import AboutPage from 'pages/AboutPage';

describe('[ABOUT PAGE] - Testing Component', () => {
	test('Should be have the text!', () => {
		render(<AboutPage />);
		expect(screen.getByText(/ABOUT PAGE/i)).toBeInTheDocument();
	});
});
