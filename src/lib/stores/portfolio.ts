import { writable } from 'svelte/store';
import type { PortfolioData } from '$lib/types/portfolio';
import portfolioData from '$lib/data/portfolio.json';

export const portfolio = writable<PortfolioData>(portfolioData as PortfolioData);
