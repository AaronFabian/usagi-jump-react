import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const animations = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export default function PageNotFound() {
	return (
		<motion.div
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.75, ease: 'easeInOut' }}
		>
			<h1>page not found !</h1>
			<Link to="/">back to home</Link>
		</motion.div>
	);
}
