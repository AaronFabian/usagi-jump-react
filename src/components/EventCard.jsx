import { FaMapSigns, FaStar } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

import styles from './EventCard.module.css';
import { useUser } from '../context/userProvider.jsx';

export default function EventCard({ image, eventName, location, startDate, timezone, venueName, city, identifier }) {
	const { favoriteIDs, dispatch } = useUser();

	async function handleAddFavorite(e) {
		e.preventDefault();
	}

	const eventDate = new Date(startDate);
	const year = eventDate.getFullYear();
	const month = String(eventDate.getMonth() + 1).padStart(2, '0');
	const day = String(eventDate.getDate()).padStart(2, '0');
	const formattedEventDate = `${year}年-${month}月-${day}日`;

	const isUserFavorite = favoriteIDs.includes(identifier);

	return (
		<div className={styles.card}>
			<div className={isUserFavorite ? styles.favorite_icon : styles.non_favorite_icon} onClick={handleAddFavorite}>
				<FaStar />
			</div>

			<div className={styles.header}>
				<img src={image} alt="" />
			</div>
			<div className={styles.info}>
				<p className={styles.title}>{eventName}</p>
				<p className={styles.description}>
					<FaMapSigns /> {city} {location}
				</p>
				<p className={styles.description}>
					<MdDateRange /> {formattedEventDate}
				</p>
			</div>
			<div className={styles.footer}>
				<p className={styles.tag}>{timezone}</p>
				<p className={styles.tag}>{venueName}</p>
			</div>
		</div>
	);
}
