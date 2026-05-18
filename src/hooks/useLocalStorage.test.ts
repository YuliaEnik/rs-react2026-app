import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "search";

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should use initial value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "init"));
    expect(result.current[0]).toBe("init");
  });

  it("should save new value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, ""));
    
    act(() => {
      result.current[1]("new_val");
    });

    expect(result.current[0]).toBe("new_val");
    expect(window.localStorage.getItem(KEY)).toBe("new_val");
  });
});
