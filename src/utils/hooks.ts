import { Product } from "eos-lib/models/product";
import { UserAction } from "eos-lib/models/user-action";
import { useEffect, useState } from "react";
import { createProduct } from "./utils";

export function useFetchProducts(userAction?: UserAction) {
	const [data, setData] = useState<Product[] | null>(null);
	const [isLoading, setLoading] = useState(true);

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
		if (userAction && userAction.type === "new-entry") {
			setData((x) => {
				if (x) {
					const clone = [...x];
					clone.push(createProduct(clone.length));
					return clone;
				}
				return x;
			});
		}
	}, [JSON.stringify(userAction)]);

	return { isLoading, data };
}

export function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
