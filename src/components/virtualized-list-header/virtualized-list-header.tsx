import React from "react";
import styles from "./virtualized-list-header.module.css";

type VirtualizedListHeaderProps = {
  columns: string[];
};

export default function VirtualizedListHeader({
  columns,
}: VirtualizedListHeaderProps) {
  const [id, name, material, price] = columns;
  return (
    <div className={styles.header}>
      <div className={styles.col}>{capitalize(id)}</div>
      <div className={styles.col}>{capitalize(name)}</div>
      <div className={styles.col}>{capitalize(price)}</div>
      <div className={styles.col}>{capitalize(material)}</div>
    </div>
  );
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
