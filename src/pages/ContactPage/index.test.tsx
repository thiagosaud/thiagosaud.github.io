import { render, screen } from '@testing-library/react';
import ContactPage from 'pages/ContactPage';

describe('[CONTACT PAGE] - Testing Component', () => {
	test('Should be have the text!', () => {
		render(<ContactPage />);
		expect(screen.getByText(/CONTACT PAGE/i)).toBeInTheDocument();
	});
});
