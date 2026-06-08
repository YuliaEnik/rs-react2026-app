import { describe, it, expect, beforeEach } from 'vitest';
import { useCountryStore } from './useCountryStore';

describe('useCountryStore', () => {
  beforeEach(() => {
    useCountryStore.setState({ cards: [] });
  });

  it('should have a default list of countries on English', () => {
    const state = useCountryStore.getState();

    expect(state.list).not.toBeNull();
    expect(state.list.includes('USA')).toBe(true);
    expect(state.list.includes('Ukraine')).toBe(true);
    expect(state.list.length).toBe(10);
  });

  it('should successfully add a new card to the cards array', () => {
    const newCard = {
      name: 'Yulia',
      age: 25,
      email: 'yulia@test.com',
      country: 'Ukraine',
      gender: 'female',
      agree: true,
      file: 'data:image/png;base64,mock_base64_string',
    };

    useCountryStore.getState().addCard(newCard);

    const updatedState = useCountryStore.getState();

    expect(updatedState.cards.length).toBe(1);
    expect(updatedState.cards[0].name).toBe('Yulia');
    expect(updatedState.cards[0].country).toBe('Ukraine');
  });

  it('should append multiple cards in the correct order', () => {
    const card1 = {
      name: 'Alice',
      age: 20,
      email: 'alice@test.com',
      country: 'Canada',
      gender: 'female',
      agree: true,
      file: '',
    };

    const card2 = {
      name: 'Bob',
      age: 30,
      email: 'bob@test.com',
      country: 'USA',
      gender: 'male',
      agree: true,
      file: '',
    };

    useCountryStore.getState().addCard(card1);
    useCountryStore.getState().addCard(card2);

    const state = useCountryStore.getState();

    expect(state.cards.length).toBe(2);
    expect(state.cards[0].name).toBe('Alice');
    expect(state.cards[1].name).toBe('Bob');
  });
});
