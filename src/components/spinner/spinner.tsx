import styles from "./spinner.module.css";

export function Spinner(): JSX.Element {
	return (
		<svg className={styles.spinner} viewBox="0 0 50 50">
			<circle
				className={styles.path}
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke-width="5"
			></circle>
		</svg>
	);
}
