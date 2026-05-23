import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./useStore";

describe("useStore", () => {
  beforeEach(() => {
    act(() => useStore.setState({ selectedIds: [] }));
  });

  it("adds id", () => {
    const { result } = renderHook(() => useStore());
    act(() => result.current.toggleCard(1));
    expect(result.current.selectedIds).toContain(1);
  });

  it("removes id", () => {
    const { result } = renderHook(() => useStore());
    act(() => result.current.toggleCard(1));
    act(() => result.current.toggleCard(1));
    expect(result.current.selectedIds).not.toContain(1);
  });
});
