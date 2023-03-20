import { useEffect, useState } from "react";
import { User } from "eos-lib/models/user";
import { Spinner } from "../spinner/spinner";

export function UserList() {
	const [data, setData] = useState<User[] | null>(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("/api/users")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	if (isLoading) return <Spinner />;
	if (!data) return <p>No data</p>;

	return (
		<div>
			<ul>
				{data.slice(0, 10).map((u) => (
					<li key={u.id}>{`${u.firstName} - ${u.lastName}`}</li>
				))}
			</ul>
			Total items: {data.length}
		</div>
	);
}
