import { render, screen } from '@testing-library/react';
import HomePage from 'pages/HomePage';

describe('[HOME PAGE] - Testing Component', () => {
	test('Should be have the text!', () => {
		render(<HomePage />);
		expect(screen.getByText(/HOME PAGE/i)).toBeInTheDocument();
	});
});
