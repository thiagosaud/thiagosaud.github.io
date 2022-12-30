import { render, screen } from '@testing-library/react';
import PortfolioPage from 'pages/PortfolioPage';

describe('[PORTFOLIO PAGE] - Testing Component', () => {
	test('Should be have the text!', () => {
		render(<PortfolioPage />);
		expect(screen.getByText(/PORTFOLIO PAGE/i)).toBeInTheDocument();
	});
});
