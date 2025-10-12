import type { PageServerLoad } from './$types';
import portfolioData from '$lib/data/portfolio.json';

export const load: PageServerLoad = async () => {
	// Load portfolio data on the server side for SSR
	// This ensures the data is available on first render
	return {
		portfolio: portfolioData
	};
};
