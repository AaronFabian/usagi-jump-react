import { useNavigate } from 'react-router-dom';
import ExploreEvents from '../components/ExploreEvents.jsx';
import { FaHome } from 'react-icons/fa';

export default function ExploreContent() {
	const navigate = useNavigate();

	return (
		<>
			<button onClick={() => navigate('/home')}>
				<FaHome />
			</button>

			<ExploreEvents />
		</>
	);
}
