import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import styles from './RectangleCard.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserProvider.jsx';
import axios from 'axios';
import { DE_FES_BASE_URL } from '../api/deFesApi.jsx';

export default function RectangleEventCard({ eventIdentifier, eventName, description, startDate, image }) {
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch, login } = useUser();

	async function handleRemoveEvent(e) {
		e.preventDefault();

		try {
			setIsLoading(true);

			// check if user logged in or not
			if (!login) throw new Error('Not logged in! Please logged to use this feature.');

			const token = localStorage.getItem('jwt');

			await axios({
				url: `${DE_FES_BASE_URL}/favorite/${eventIdentifier}`,
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});

			dispatch({ type: 'POP_FAVORITE', payload: eventIdentifier });

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

	const formattedEventIdentifier = eventIdentifier.split(':')[1];

	return (
		<div className={styles['blog_card']}>
			<button className={styles['delete_icon']} onClick={handleRemoveEvent} disabled={isLoading}>
				<RxCross1 />
			</button>
			<div className={styles['meta']}>
				<div className={styles['photo']}>
					<img src={image} alt={eventName} />
				</div>
				<ul className={styles['details']}>
					{/* <li className={styles['author']}>
						<a href="#">John Doe</a>
					</li>
					<li className={styles['date']}>Aug. 24, 2015</li>
					<li className={styles['tags']}>
						<ul>
							<li>
								<a href="#">Learn</a>
							</li>
							<li>
								<a href="#">Code</a>
							</li>
							<li>
								<a href="#">HTML</a>
							</li>
							<li>
								<a href="#">CSS</a>
							</li>
						</ul>
					</li> */}
				</ul>
			</div>
			<div className={styles['description']}>
				<h1>{eventName}</h1>
				<h2>Event date {formattedEventDate}</h2>
				<p>{description}</p>
				<p className={styles['read-more']}>
					<Link to={`/events/${formattedEventIdentifier}`}>Read More</Link>
				</p>
			</div>
		</div>
	);
}
