import { UserAction } from "eos-lib/models/user-action";
import { Inter } from "next/font/google";
import { useState } from "react";
import { ProductList } from "../product-list/product-list";

const inter = Inter({ subsets: ["latin"] });

export default function Layout(): JSX.Element {
	const [userAction, setUserAction] = useState<UserAction>();

	function handleNewEntry() {
		setUserAction({ type: "new-entry", timeStamp: Date.now() });
	}

	function handleScrollToTop() {
		setUserAction({ type: "scroll-top", timeStamp: Date.now() });
	}

	return (
		<div className={inter.className}>
			<header>
				<h1>Virtualized List</h1>
				<button onClick={handleNewEntry}>Add new item</button>
			</header>
			<main>
				<ProductList userAction={userAction} />
			</main>
			<footer>
				<button onClick={handleScrollToTop}>Scroll to Top</button>
			</footer>
		</div>
	);
}
