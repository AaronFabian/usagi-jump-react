import styles from './GenericButton.module.css';

export default function GenericButton({ children, onClick = () => {} }) {
	return (
		<button onClick={onClick} className={styles.generic_button}>
			{children}
		</button>
	);
}
