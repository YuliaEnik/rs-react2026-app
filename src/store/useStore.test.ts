import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./useStore";
import type { IData } from "../types/types";

const mockCard1: IData = {
  id: 1,
  title: "Test Artwork 1",
  description: "Beautiful painting",
};

const mockCard2: IData = {
  id: 2,
  title: "Test Artwork 2",
  description: "Classic sculpture",
};

describe("useStore", () => {
  beforeEach(() => {
    act(() => useStore.setState({ selectedCards: [] }));
  });

  it("should add a card to selectedCards when toggleCard is called", () => {
    const { result } = renderHook(() => useStore());

    act(() => result.current.toggleCard(mockCard1));

    expect(result.current.selectedCards).toContainEqual(mockCard1);
    expect(result.current.selectedCards.length).toBe(1);
  });

  it("should remove the card from selectedCards if it is already selected", () => {
    const { result } = renderHook(() => useStore());

    act(() => result.current.toggleCard(mockCard1));
    act(() => result.current.toggleCard(mockCard1));

    expect(result.current.selectedCards).not.toContainEqual(mockCard1);
    expect(result.current.selectedCards.length).toBe(0);
  });

  it("should correctly handle selecting multiple different cards", () => {
    const { result } = renderHook(() => useStore());

    act(() => result.current.toggleCard(mockCard1));
    act(() => result.current.toggleCard(mockCard2));

    expect(result.current.selectedCards).toContainEqual(mockCard1);
    expect(result.current.selectedCards).toContainEqual(mockCard2);
    expect(result.current.selectedCards.length).toBe(2);
  });

  it("should clear all selected cards when unselectAll is called", () => {
    const { result } = renderHook(() => useStore());

    act(() => result.current.toggleCard(mockCard1));
    act(() => result.current.toggleCard(mockCard2));
    expect(result.current.selectedCards.length).toBe(2);

    act(() => result.current.unselectAll());

    expect(result.current.selectedCards).toEqual([]);
    expect(result.current.selectedCards.length).toBe(0);
  });
});
