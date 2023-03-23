import { render, screen } from "@testing-library/react";
import ListItem, {
	ListItemProps,
} from "eos-lib/components/list-item/list-item";

describe("List Item", () => {
	it("Should render the component correctly", () => {
		const mockProps: ListItemProps = {
			height: 100,
			index: 6,
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
