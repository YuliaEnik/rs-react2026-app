import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { HomePage } from './HomePage';


describe('HomePage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('show skeletons and caeds after rende', async () => {
    render(<HomePage />);

    const skeletons = document.querySelectorAll('.skeleton-card'); 
    expect(skeletons.length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText('Test Artwork 1')).toBeInTheDocument();
      expect(screen.getByText('Test Artwork 2')).toBeInTheDocument();
    }, { timeout: 3000 });

  });

  it('notice "Sorry, nothing found", if cardList clear', async () => {
    localStorage.setItem('items', 'UnknownArt');
    
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, nothing found for "UnknownArt"/i)).toBeInTheDocument();

      const cards = screen.queryAllByRole('card'); 
      expect(cards.length).toBe(0);
    });
  });
});
