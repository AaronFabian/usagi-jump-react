import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userProvider.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { loading: isLoading, login } = useUser();

	// console.log(isLoading);

	useEffect(
		function () {
			if (!login) navigate('/login');
		},
		[login, navigate]
	);

	if (isLoading) {
		return <p>Loading route...</p>;
	}

	return children;
}
