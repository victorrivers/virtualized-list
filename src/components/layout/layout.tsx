import { useState } from "react";
import { UserAction } from "eos-lib/models/user-action";
import { Inter } from "next/font/google";
import { useFetchProducts } from "eos-lib/utils/hooks";
import { Spinner } from "../spinner/spinner";
import VirtualizedList from "../virtualized-list/virtualized-list";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Layout(): JSX.Element {
	const [userAction, setUserAction] = useState<UserAction>();

	function handleNewEntry() {
		setUserAction({ type: "new-entry", timeStamp: Date.now() });
	}

	function handleScrollToTop() {
		setUserAction({ type: "scroll-top", timeStamp: Date.now() });
	}

	const { isLoading, data } = useFetchProducts(userAction);

	let addNewEntryButton;
	let content;
	let footer;

	if (isLoading) {
		content = (
			<div className={styles.spinner}>
				<Spinner />
			</div>
		);
	} else {
		if (data) {
			addNewEntryButton = (
				<button onClick={handleNewEntry}>Add new item</button>
			);

			content = (
				<VirtualizedList
					items={data}
					itemHeight={100}
					userAction={userAction}
				/>
			);

			footer = (
				<footer className={styles.footer}>
					<button onClick={handleScrollToTop}>Scroll to Top</button>
				</footer>
			);
		} else {
			content = <p>No data</p>;
		}
	}

	return (
		<div className={`${inter.className} ${styles.container}`}>
			<header className={styles.header}>
				<div className={styles.headerItem} />
				<h1 className={`${styles.headerItem} ${styles.textAlignCenter}`}>
					Virtualized List
				</h1>
				<div className={`${styles.headerItem} ${styles.alignRight}`}>
					{addNewEntryButton}
				</div>
			</header>
			<main>{content}</main>
			{footer}
		</div>
	);
}
