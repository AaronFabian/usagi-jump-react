import axios from 'axios';
import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginForm.module.css';
import { useUser } from '../context/UserProvider.jsx';

export default function LoginForm() {
	const navigate = useNavigate();
	const { dispatch } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleRegister(e) {
		e.preventDefault();

		// get user inp
		const inpEmail = emailRef.current.value;
		const inpPassword = passwordRef.current.value;

		const user = {
			email: inpEmail,
			password: inpPassword,
		};

		try {
			// register to our server
			setIsLoading(true);

			const axiosResponseConfig = {};
			axiosResponseConfig.method = 'POST';
			axiosResponseConfig.url = 'http://127.0.0.1:3000/users/login';
			axiosResponseConfig.data = user;
			axiosResponseConfig.withCredentials = true;

			const response = await axios(axiosResponseConfig);

			// set new jwt token from logged token
			localStorage.setItem('jwt', response.data.token);

			// updating the provider
			dispatch({ type: 'SET_USERNAME', payload: response.data.data.user.username });
			dispatch({ type: 'SET_LOGIN', payload: true });

			// if everything is ok then redirect to home page
			setError(null);
			setSuccess('Login success');

			// toast from library
			toast.success('Login success');

			// redirect to home and never see this page again if the user is logged in
			setTimeout(() => navigate('/home'), 2000);
		} catch (error) {
			// set error message but not for success message
			setError(error.response.data.message);
			setSuccess(null);

			// error toast for make our website more appealing
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

							<input type="text" placeholder="email address" ref={emailRef} />
							<input type="password" placeholder="password" ref={passwordRef} />
							<button onClick={handleRegister} disabled={isLoading}>
								login
							</button>

							<p className={styles.message}>
								Not registered? <a href="/register">Create an account</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
