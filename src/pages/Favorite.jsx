import { useNavigate } from 'react-router-dom';
import RectangleEventCard from '../components/RectangleEventCard.jsx';
import { useUser } from '../context/UserProvider.jsx';

export default function Favorite() {
	const navigate = useNavigate();
	const { favoriteIDs } = useUser();

	return (
		<>
			<button onClick={() => navigate(-1)}>戻る</button>

			{favoriteIDs?.map(event => (
				<RectangleEventCard
					key={event.eventIdentifier}
					eventIdentifier={event.eventIdentifier}
					eventName={event.eventName}
					description={event.description ?? '-'}
					startDate={event.startDate}
					image={event.imageUrl}
				/>
			))}

			{favoriteIDs.length === 0 && <p style={{ textAlign: 'center' }}>None</p>}
		</>
	);
}
