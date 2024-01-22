import LoginForm from '../components/LoginForm.jsx';
import { useEffect } from 'react';
import { useUser } from '../context/UserProvider.jsx';
import { useNavigate } from 'react-router-dom';

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
