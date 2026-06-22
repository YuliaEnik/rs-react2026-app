import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "./page";

describe("AboutUs", () => {
  it("renders component", () => {
    render(<About />);
    expect(document.querySelector(".about-page")).toBeInTheDocument();
  });

  it("shows title", () => {
    render(<About />);
    expect(screen.getByText("About the Project")).toBeInTheDocument();
  });

  it("shows museum information", () => {
    render(<About />);
    expect(screen.getByText("The Museum")).toBeInTheDocument();
    expect(screen.getByText(/Cleveland Museum of Art/i)).toBeInTheDocument();
  });

  it("shows application information", () => {
    render(<About />);
    expect(screen.getByText("The Application")).toBeInTheDocument();
    expect(screen.getByText(/RS School React Course/i)).toBeInTheDocument();
  });

  it("has RS School link with correct URL", () => {
    render(<About />);
    const link = screen.getByRole("link", { name: /RS School React Course/i });
    expect(link).toHaveAttribute("href", "https://rs.school/courses/reactjs");
  });
});
