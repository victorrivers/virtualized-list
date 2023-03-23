import React, { useState, useRef, useEffect, useMemo } from "react";
import ListItem from "../list-item/list-item";
import VirtualizedListHeader from "../virtualized-list-header/virtualized-list-header";
import { Product } from "eos-lib/models/product";
import { UserAction } from "eos-lib/models/user-action";
import styles from "./virtualized-list.module.css";

interface VirtualizedListProps {
  items: Product[];
  itemHeight: number;
  userAction?: UserAction;
}

type VisibleProduct = Product & {
  position: number;
};

export default function VirtualizedList({
  items,
  itemHeight,
  userAction,
}: VirtualizedListProps): JSX.Element {
  const [visibleItems, setVisibleItems] = useState<VisibleProduct[]>(
    items.slice(0, 6).map((item, index) => {
      return { ...item, position: index };
    })
  );
  const [scroll, setScroll] = useState<number>(0);

  const listContainerRef = useRef<HTMLDivElement>(null);
  const listContainerHeight = items.length * itemHeight;

  function handleScroll() {
    const listContainer = listContainerRef.current;
    if (listContainer !== null) {
      const scrollTop = listContainer.scrollTop;
      const scrollBottom = scrollTop + listContainer.clientHeight;
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.ceil(scrollBottom / itemHeight);
      setVisibleItems(
        items.slice(startIndex, endIndex).map((item, index) => {
          return { ...item, position: startIndex + index };
        })
      );
    }
  }

  function scrollToTop() {
    if (listContainerRef.current != null) {
      listContainerRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    //Scroll to last item on the bottom of the list
    setScroll((items.length - 1) * itemHeight);
    if (listContainerRef.current != null) {
      listContainerRef.current.scrollTop = scroll;
    }
  }, [items.length]);

  useEffect(() => {
    if (userAction && userAction.type === "scroll-top") {
      scrollToTop();
    }
  }, [userAction]);

  return (
    <div className={styles.container}>
      <VirtualizedListHeader
        columns={Object.keys(items[0])}
        className={styles.listHeader}
      />
      <div
        className={styles.listContainer}
        onScroll={handleScroll}
        ref={listContainerRef}
      >
        <ul className={styles.list} style={{ height: listContainerHeight }}>
          {visibleItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              index={item.position}
              height={itemHeight}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
