import { describe, it, expect, vi, beforeEach } from "vitest";
import { downloadCSV } from "./downloadCSV";
import type { IData } from "../types/types";

describe("downloadCSV helper", () => {
  let mockLink: Partial<HTMLAnchorElement>;

  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:http://localhost/mock-uuid"),
      revokeObjectURL: vi.fn(),
    });

    mockLink = {
      href: "",
      download: "",
      click: vi.fn(),
    };

    vi.spyOn(document, "createElement").mockReturnValue(
      mockLink as HTMLAnchorElement,
    );

    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);
  });

  it("should not create a download link if selectedCards array is empty", () => {
    const createElementSpy = vi.spyOn(document, "createElement");
    downloadCSV([]);
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it("should configure native browser APIs with correct parameters and dynamic file name", () => {
    const testCards: IData[] = [
      { id: 15, title: "Mona Lisa", description: "Famous portrait" },
    ];
    downloadCSV(testCards);
    expect(mockLink.download).toBe("1_items.csv");
    expect(mockLink.href).toBe("blob:http://localhost/mock-uuid");
    expect(mockLink.click).toHaveBeenCalledTimes(1);
  });
});
