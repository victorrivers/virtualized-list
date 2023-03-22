import { Product } from "eos-lib/models/product";
import React from "react";
import styles from "./list-item.module.css";

type ListItemProps = {
  height: number;
  item: Product;
  index: number;
};

export default function ListItem({ item, height, index }: ListItemProps) {
  return (
    <li className={styles.item} style={{ height, top: index * height }}>
      <p className={styles.col}>{index}</p>
      <p className={styles.col}>
        <span>{item.name}</span>
      </p>
      <p className={styles.col}>
        <span>{item.material}</span>
      </p>
      <p className={styles.col}>{item.price}</p>
    </li>
  );
}
