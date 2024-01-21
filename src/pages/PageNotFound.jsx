import { Link } from 'react-router-dom';

export default function PageNotFound() {
	return (
		<>
			<h1>page not found !</h1>
			<Link to="/">back to home</Link>
		</>
	);
}
