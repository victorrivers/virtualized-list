import { screen, render } from "@testing-library/react";
import VirtualizedListHeader from "eos-lib/components/virtualized-list-header/virtualized-list-header";

const mockProps = ["id", "name", "material", "price"];

describe("List Header", () => {
  it("Should render the component", () => {
    const component = render(<VirtualizedListHeader columns={mockProps} />);

    expect(component.baseElement).toBeInTheDocument();
  });

  it("Should render the name and material correctly", () => {
    render(<VirtualizedListHeader columns={mockProps} />);

    const nameElement = screen.getByText(/Name/);
    const descElement = screen.getByText(/Material/);

    expect(nameElement.textContent).toEqual("Name");
    expect(descElement.textContent).toEqual("Material");
  });
});
