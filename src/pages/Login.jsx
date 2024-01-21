import { motion } from 'framer-motion';

import LoginForm from '../components/LoginForm.jsx';
import { useEffect } from 'react';
import { useUser } from '../context/UserProvider.jsx';
import { useNavigate } from 'react-router-dom';

// const animations = {
// 	initial: { opacity: 0, y: 100 },
// 	animate: { opacity: 1, y: 0 },
// 	exit: { opacity: 0, y: -100 },
// };

export default function Login() {
	const navigate = useNavigate();
	const { login: isLogin } = useUser();

	useEffect(() => {
		if (isLogin) navigate('/home');
	}, [isLogin, navigate]);

	return (
		<>
			<LoginForm />;
		</>
	);
}
