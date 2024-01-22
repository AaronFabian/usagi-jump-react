import { Link } from 'react-router-dom';

import styles from './Card.module.css';

export default function Card({ name, image, performer, eventIdentifier, performerIdentifier }) {
	const performerId = performerIdentifier.split(':');
	const eventId = eventIdentifier.split(':'); // ex: "[jambase, 10768017]"

	return (
		<div className={styles.card}>
			<Link to={`/events/${eventId[1]}`}>
				<img src={image} alt={name} />
			</Link>
			<div className={styles.container}>
				<Link to={`/performers/${performerId[1]}`}>
					<h4>
						<b>{performer}</b>
					</h4>
				</Link>
				<p>{name}</p>
			</div>
		</div>
	);
}
