import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Application Root Initialization", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.resetModules();
  });

  it("should mount the application into the DOM root element without throwing errors", async () => {
    await expect(import("./main")).resolves.not.toThrow();

    await new Promise((resolve) => setTimeout(resolve, 10));

    const rootElement = document.getElementById("root");
    
    expect(rootElement?.innerHTML).not.toBe("");
  });
});