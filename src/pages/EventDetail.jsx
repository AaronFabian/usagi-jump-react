import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const animations = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export default function EventDetail() {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	console.log(params);

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

	console.log(data);

	return (
		<>
			<motion.h1 {...animations} transition={{ duration: 0.75, delay: 0.25, ease: 'easeInOut' }}>
				Event Detail
			</motion.h1>

			{/* <motion.button onClick={() => setIsLoading(!isLoading)}>{!isLoading ? 'Open' : 'Close'}</motion.button> */}

			<AnimatePresence mode="wait">
				{isLoading && (
					<Link to="/home">
						<motion.div
							animate={{ opacity: 1, x: 0 }}
							initial={{ opacity: 0, x: -100 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ ease: 'easeInOut', duration: 0.25 }}
						>
							back to home
						</motion.div>
					</Link>
				)}
			</AnimatePresence>
		</>
	);
}
