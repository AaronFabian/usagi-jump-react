import axios from 'axios';
import { useState } from 'react';
import { FaMapSigns, FaStar, FaStopwatch } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

import toast from 'react-hot-toast';
import { useUser } from '../context/UserProvider.jsx';
import { DE_FES_BASE_URL } from '../api/deFesApi.jsx';

import styles from './EventCard.module.css';

export default function EventCard({ image, eventName, location, startDate, timezone, venueName, city, identifier }) {
	const { favoriteIDs, login, dispatch } = useUser();
	const [isLoading, setIsLoading] = useState(false);

	async function handleAddFavorite(e) {
		e.preventDefault();

		try {
			setIsLoading(true);

			// check if user logged in or not
			if (!login) throw new Error('Not logged in! Please logged to use this feature.');

			const newEventFavorite = {
				eventIdentifier: identifier,
				imageUrl: image,
				eventName,
				startDate,
			};

			const token = localStorage.getItem('jwt');

			const response = await axios({
				url: `${DE_FES_BASE_URL}/favorite/add`,
				method: 'POST',
				data: newEventFavorite,
				headers: { Authorization: `Bearer ${token}` },
			});

			dispatch({ type: 'PUSH_FAVORITE', payload: response.data.data });

			toast.success('added to favorite');
		} catch (error) {
			if (error.response.status === 400) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	async function handleRemoveEvent(e) {
		e.preventDefault();

		try {
			setIsLoading(true);

			// check if user logged in or not
			if (!login) throw new Error('Not logged in! Please logged to use this feature.');

			const token = localStorage.getItem('jwt');

			await axios({
				url: `${DE_FES_BASE_URL}/favorite/${identifier}`,
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});

			dispatch({ type: 'POP_FAVORITE', payload: identifier });

			toast.success('removed from favorite');
		} catch (error) {
			if (error.response.status === 400) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	const eventDate = new Date(startDate);
	const year = eventDate.getFullYear();
	const month = String(eventDate.getMonth() + 1).padStart(2, '0');
	const day = String(eventDate.getDate()).padStart(2, '0');
	const formattedEventDate = `${year}年-${month}月-${day}日`;

	// return an object if not return null which is falsy value
	const isUserFavorite = favoriteIDs.find(event => event.eventIdentifier === identifier);

	return (
		<div className={styles.centering_detail}>
			<div className={styles.card}>
				{isLoading ? (
					<div className={isUserFavorite ? styles.favorite_icon : styles.non_favorite_icon}>
						<FaStopwatch />
					</div>
				) : (
					<div
						className={isUserFavorite ? styles.favorite_icon : styles.non_favorite_icon}
						onClick={isUserFavorite ? handleRemoveEvent : handleAddFavorite}
					>
						<FaStar />
					</div>
				)}

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
		</div>
	);
}
