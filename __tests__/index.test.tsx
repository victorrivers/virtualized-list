import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "eos-lib/pages";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /hello/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
