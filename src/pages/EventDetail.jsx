import { useParams } from 'react-router-dom';

export default function EventDetail() {
	const params = useParams();
	console.log(params);

	return <h1>event detail</h1>;
}
