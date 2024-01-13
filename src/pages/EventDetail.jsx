import { useParams } from 'react-router-dom';

import AppLayout from '../ui/AppLayout.jsx';

export default function EventDetail() {
	const params = useParams();
	console.log(params);

	return (
		<AppLayout>
			<h1>event detail</h1>
		</AppLayout>
	);
}
