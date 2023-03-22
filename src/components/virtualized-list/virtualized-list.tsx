import React, { useState, useRef, useEffect, useMemo } from "react";
import ListItem from "../list-item/list-item";
import VirtualizedListHeader from "../virtualized-list-header/virtualized-list-header";
import { Product } from "eos-lib/models/product";
import styles from "./virtualized-list.module.css";
import { useDebounce } from "eos-lib/utils/hooks";

type VirtualizedListProps = {
  items: Product[];
  itemHeight: number;
};

interface VisibleProduct extends Product {
  position: number;
}

const itemOffset = 400;
export default function VirtualizedList({
  items,
  itemHeight,
}: VirtualizedListProps) {
  const [visibleItems, setVisibleItems] = useState<VisibleProduct[]>(
    items.slice(0, 6).map((item, index) => {
      return { ...item, position: index };
    })
  );
  const [scroll, setScroll] = useState<number>(0);

  const outerContainerRef = useRef<HTMLDivElement>(null);
  const listContainerHeight = items.length * itemHeight;

  const [value, setValue] = useState<number>(0);
  const debouncedValue = useDebounce<number>(value, 500);

  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
    console.log("DEB", debouncedValue);
  }, [debouncedValue]);

  const handleEndScroll = useMemo(
    () => console.log("END SCROLL"),
    //_.debounce(() => console.log("END SCROLL"), 1000),
    []
  );

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    setValue(Date.now());

    const outerContainer = outerContainerRef.current;
    if (outerContainer !== null) {
      const scrollTop = outerContainer.scrollTop;
      const scrollBottom = scrollTop + outerContainer.clientHeight;
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
    if (outerContainerRef.current != null)
      outerContainerRef.current.scrollTop = 0;
  }

  useEffect(() => {
    //Scroll to last item on the bottom of the list
    setScroll(items.length * itemHeight - itemOffset);
    if (outerContainerRef.current != null) {
      outerContainerRef.current.scrollTop = scroll;
    }
  }, [items.length]);

  return (
    <>
      <div className={styles.container}>
        <VirtualizedListHeader columns={Object.keys(items[0])} />
        <div
          data-testid="outer-container"
          className={styles.outerContainer}
          onScroll={handleScroll}
          ref={outerContainerRef}
        >
          <ul className={styles.list} style={{ height: listContainerHeight }}>
            {visibleItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  index={item.position}
                  height={itemHeight}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <button onClick={scrollToTop}>Scroll to Top</button>
    </>
  );
}
