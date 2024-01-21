import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from './LoginForm.module.css';
import axios from 'axios';
import { useUser } from '../context/userProvider.jsx';

export default function RegisterForm() {
	const navigate = useNavigate();
	const { dispatch } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleRegister(e) {
		e.preventDefault();

		// get user inp
		const inpUsername = usernameRef.current.value;
		const inpEmail = emailRef.current.value;
		const inpPassword = passwordRef.current.value;

		// create userEntity;
		const newUser = {
			username: inpUsername,
			email: inpEmail,
			password: inpPassword,
			phone: '0123456789',
		};

		// register to our server
		setIsLoading(true);

		try {
			const response = await axios({
				method: 'POST',
				url: 'http://127.0.0.1:3000/users/register',
				data: newUser,
				withCredentials: true,
			});

			// set the jwt
			localStorage.setItem('jwt', response.data.token);

			// set provider to login
			dispatch({ type: 'SET_LOGIN', payload: true });

			// if everything is ok then redirect to home page
			setError(null);
			setSuccess('Register success');
			toast.success('Register success');
			setTimeout(() => navigate('/home'), 2000);
		} catch (error) {
			setError(error.response.data.message);
			setSuccess(null);
			toast.error(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="login-page">
			<div className="form">
				<div className={styles.login_page_content}>
					<div className={styles.form}>
						<form className={styles.login_form}>
							{error && <p className={styles.error_message}>{error}</p>}
							{success && <p className={styles.success_message}>{success}</p>}

							<input type="text" placeholder="username" ref={usernameRef} />
							<input type="text" placeholder="email address" ref={emailRef} />
							<input type="password" placeholder="password" ref={passwordRef} />
							<button onClick={handleRegister} disabled={isLoading}>
								register
							</button>

							<p className={styles.message}>
								Already registered? <a href="/login">Login now</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
