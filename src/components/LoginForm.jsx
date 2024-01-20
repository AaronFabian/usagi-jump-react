import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleLogin(e) {
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
		const response = await fetch('http://127.0.0.1:3000/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		});

		const data = await response.json();

		if (response.status === 400) {
			setError(data.message);
			setResponse(null);
			toast.error(data.message);
		} else {
			console.log(data);
			setError(null);
			setResponse('Register success');
			toast.success('Register success');
			setTimeout(() => navigate('/home'), 3000);
		}

		setIsLoading(false);
	}

	return (
		<div className="login-page">
			<div className="form">
				{error && <p>{error}</p>}
				{response && <p>{response}</p>}

				<form className="register-form">
					<input type="text" placeholder="username address" ref={usernameRef} />
					<input type="text" placeholder="email address" ref={emailRef} />
					<input type="password" placeholder="password" ref={passwordRef} />
					<button onClick={handleLogin}>{isLoading ? 'Registering...' : 'create'}</button>
					<p className="message">
						Already registered? <a href="#">Sign In</a>
					</p>
				</form>
			</div>
		</div>
	);
}
