import { motion } from 'framer-motion';

import LoginForm from '../components/LoginForm.jsx';

// import styles from './Login.module.css';

const animations = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

export default function Login() {
	return (
		<motion.div
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.75, ease: 'easeInOut' }}
		>
			<LoginForm />
		</motion.div>
	);
}
