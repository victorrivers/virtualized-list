import { render, screen } from "@testing-library/react";
import VirtualizedList from "eos-lib/components/virtualized-list/virtualized-list";
import { Product } from "eos-lib/models/product";

describe("VirtualizedList", () => {
  it("Should render the list", () => {
    const component = render(<VirtualizedList {...mockProps} />);

    expect(component.baseElement).toBeInTheDocument();
  });

  it("Should include the first item in the list", () => {
    render(<VirtualizedList {...mockProps} />);

    const listItems = screen.getAllByText(/foo/);
    expect(listItems[0].textContent).toEqual("foo 1");
  });

  it("Should not include seventh item in the list", () => {
    render(<VirtualizedList {...mockProps} />);

    const listItems = screen.getAllByText(/foo/);
    expect(listItems[6]).toBeUndefined();
  });
});

type VirtualizedListProps = {
  items: Product[];
  itemHeight: number;
};

const mockProps: VirtualizedListProps = {
  items: [
    {
      name: "foo 1",
      material: "description",
      price: "123",
      id: 0,
    },
    {
      name: "foo 2",
      material: "description",
      price: "43",
      id: 1,
    },
    {
      name: "foo 3",
      material: "description",
      price: "6544",
      id: 2,
    },
    {
      name: "foo 4",
      material: "description",
      price: "6564",
      id: 3,
    },
    {
      name: "foo 5",
      material: "description",
      price: "2564",
      id: 4,
    },
    {
      name: "foo 6",
      material: "description",
      price: "784",
      id: 5,
    },
    {
      name: "foo 7",
      material: "description",
      price: "263",
      id: 6,
    },
    {
      name: "foo 8",
      material: "description",
      price: "755",
      id: 7,
    },
  ],
  itemHeight: 100,
};
