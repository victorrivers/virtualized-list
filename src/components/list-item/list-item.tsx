import { Product } from "eos-lib/models/product";
import React from "react";
import styles from "./list-item.module.css";

export type ListItemProps = {
	height: number;
	item: Product;
	index: number;
};

export default function ListItem({
	item,
	height,
	index,
}: ListItemProps): JSX.Element {
	return (
		<li className={styles.item} style={{ height, top: index * height }}>
			<div className={styles.col}>
				<div>
					<div>{item.name}</div>
					<small className={styles.small}>{`Item # ${index}`}</small>
				</div>
			</div>
			<div className={styles.col}>
				<span>{item.material}</span>
			</div>
			<div className={styles.col}>{item.price}</div>
		</li>
	);
}
