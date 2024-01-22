import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard.jsx';

const animations = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export default function EventDetail() {
	const navigate = useNavigate();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		setIsLoading(true);

		const getArtistDetail = async () => {
			const response = await fetch(
				`https://www.jambase.com/jb-api/v1/events/id/jambase:${params.id}?apikey=c7190d90-f25c-4706-9ad1-369ba1b2ce54`
			);
			const data = await response.json();

			setData(data);
			setIsLoading(false);
		};

		try {
			getArtistDetail();
		} catch (error) {
			console.error(error);
		}
	}, [params.id]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const event = data.event;
	const eventCardProps = {
		image: event.image,
		eventName: event.name,
		venueName: event.location.name,
		city: event.location.address.addressLocality,
		location: event.location.address.streetAddress,
		timezone: event.location.address['x-timezone'],
		startDate: event.startDate,
		identifier: event.identifier,
	};

	return (
		<>
			<motion.h1 {...animations} transition={{ duration: 0.75, delay: 0.25, ease: 'easeInOut' }}>
				<button onClick={() => navigate(-1)}>戻る</button>
			</motion.h1>

			<EventCard {...eventCardProps} />
		</>
	);
}
