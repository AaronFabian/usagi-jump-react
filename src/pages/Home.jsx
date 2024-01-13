import { Link } from 'react-router-dom';
import AppLayout from '../ui/AppLayout.jsx';

export default function Home() {
	return (
		<AppLayout>
			<h1>Home</h1>
			<Link to={'/eventDetail/Aaron'}>Test</Link>
		</AppLayout>
	);
}
