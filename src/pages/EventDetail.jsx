import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AppLayout from '../ui/AppLayout.jsx';

const animations = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export default function EventDetail() {
	const params = useParams();
	const [isOpen, setIsOpen] = useState(false);

	console.log(params);

	return (
		<AppLayout>
			<h1>Hei</h1>
			<motion.h1
				{...animations}
				// variants={animations}
				// initial="initial"
				// animate="animate"
				// exit="exit"
				transition={{ duration: 0.75, delay: 0.25, ease: 'easeInOut' }}
			>
				event detail
			</motion.h1>

			<motion.button onClick={() => setIsOpen(!isOpen)}>{!isOpen ? 'Open' : 'Close'}</motion.button>

			<AnimatePresence mode="wait">
				{isOpen && (
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
		</AppLayout>
	);
}
