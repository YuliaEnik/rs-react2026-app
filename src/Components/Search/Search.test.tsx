import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Search } from './Search';

describe('Search Component', () => {

  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('localStorage after click', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'test query' } });
  
    fireEvent.click(button);

    expect(localStorage.getItem('items')).toBe('test query');
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
