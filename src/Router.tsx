import { memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import PortfolioPage from 'pages/PortfolioPage';
import ContactPage from 'pages/ContactPage';

/**
 * @thiagosaud
 * @description This component is unique in that it controls all routing flow and global components!
 */
function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} index />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default memo(Router);
