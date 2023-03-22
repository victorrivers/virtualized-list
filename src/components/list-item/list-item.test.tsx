import { render, screen } from "@testing-library/react";
import { Product } from "eos-lib/models/product";
import ListItem from "./list-item";

type ListItemProps = {
  height: number;
  position: number;
  item: Product;
};

describe("List Item", () => {
  it("Should render the component correctly", () => {
    const mockProps: ListItemProps = {
      height: 100,
      position: 0,
      item: {
        name: "Keyboard",
        material: "It writes",
        price: "132",
        id: 889,
      },
    };
    render(<ListItem {...mockProps} />);

    const name = screen.getByText(/Keyboard/i);
    expect(name.textContent).toEqual("Keyboard");
  });
});
