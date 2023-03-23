import { useEffect, useState } from "react";
import { Product } from "eos-lib/models/product";
import { Spinner } from "../spinner/spinner";
import VirtualizedList from "../virtualized-list/virtualized-list";
import { UserAction } from "eos-lib/models/user-action";
import { createProduct } from "eos-lib/utils/utils";

interface ProductListProps {
	userAction?: UserAction;
}

export function ProductList({ userAction }: ProductListProps) {
	const [data, setData] = useState<Product[] | null>(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("/api/products")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (userAction) {
			if (userAction.type === "new-entry") {
				setData((x) => {
					if (x) {
						const clone = [...x];
						clone.push(createProduct(clone.length));
						return clone;
					}
					return x;
				});
			}
		}
	}, [JSON.stringify(userAction)]);

	if (isLoading) return <Spinner />;
	if (!data) return <p>No data</p>;

	return (
		<VirtualizedList items={data} itemHeight={100} userAction={userAction} />
	);
}
