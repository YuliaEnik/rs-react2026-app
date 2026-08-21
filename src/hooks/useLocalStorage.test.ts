import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "search";

  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should use initial value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "init"));
    expect(result.current[0]).toBe("init");
  });

  it("should save new value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, ""));
    const [, setValue] = result.current;

    setValue("new_val");

    expect(window.localStorage.getItem(KEY)).toBe("new_val");
  });

  it("should remove item from localStorage if value is empty string", () => {
    window.localStorage.setItem(KEY, "existing_val");
    const { result } = renderHook(() => useLocalStorage(KEY, "existing_val"));
    const [, setValue] = result.current;

    setValue("");

    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  it("should return initial value and log error if localStorage throws on read", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(
      Object.getPrototypeOf(window.localStorage),
      "getItem",
    ).mockImplementation(() => {
      throw new Error("SecurityError");
    });

    const { result } = renderHook(() => useLocalStorage(KEY, "fallback"));

    expect(result.current[0]).toBe("fallback");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should log error if localStorage throws on write", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(
      Object.getPrototypeOf(window.localStorage),
      "setItem",
    ).mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    const { result } = renderHook(() => useLocalStorage(KEY, "init"));
    const [, setValue] = result.current;

    setValue("new_val");

    expect(consoleSpy).toHaveBeenCalled();
  });
});
