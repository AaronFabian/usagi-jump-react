import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const animations = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

export default function AppLayout() {
	return (
		<motion.div
			className="app_layout"
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.75, ease: 'easeInOut' }}
		>
			<Outlet />
		</motion.div>
	);
}
