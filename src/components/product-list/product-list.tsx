import { useEffect, useState } from "react";
import { Product } from "eos-lib/models/product";
import { Spinner } from "../spinner/spinner";
import VirtualizedList from "../virtualized-list/virtualized-list";

export function ProductList() {
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

	if (isLoading) return <Spinner />;
	if (!data) return <p>No data</p>;

	return <VirtualizedList items={data} itemHeight={50} />;
}
