import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { DE_FES_BASE_URL } from '../api/deFesApi.jsx';

const initialState = {
	username: '',
	login: false,
	loading: false,
	favoriteIDs: [],
};

const reducer = function (state, action) {
	switch (action.type) {
		case 'DECLARE_FAVORITES':
			return { ...state, favoriteIDs: [...state.favoriteIDs, ...action.payload] };

		case 'PUSH_FAVORITE':
			return { ...state, favoriteIDs: [...state.favoriteIDs, action.payload] };

		case 'POP_FAVORITE':
			return { ...state, favoriteIDs: state.favoriteIDs.filter(event => event.eventIdentifier !== action.payload) };

		case 'SET_USERNAME':
			return { ...state, username: action.payload };

		case 'SET_LOGIN':
			return { ...state, login: action.payload };

		case 'SET_LOADING':
			return { ...state, loading: action.payload };

		default:
			console.warn(action.type);
			throw new Error('Unexpected type !');
	}
};

const UserContext = createContext();

function UserProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function checkLoggedIn() {
			try {
				dispatch({ type: 'SET_LOADING', payload: true });

				// check the jwt if the jwt is expire or not to the server
				const token = localStorage.getItem('jwt');
				if (!token) throw new Error('Token not available');

				// if there is no error from the server then no let user through
				await axios({
					method: 'POST',
					url: `${DE_FES_BASE_URL}/users/check`,
					headers: { Authorization: `Bearer ${token}` },
				});

				// get all users favorite events
				const events = await getUserFavoriteEvents();

				dispatch({ type: 'SET_LOGIN', payload: true });
				dispatch({ type: 'DECLARE_FAVORITES', payload: events });
			} catch (error) {
				console.warn(error);

				dispatch({ type: 'SET_LOGIN', payload: false });
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		}

		checkLoggedIn();
	}, []);

	async function getUserFavoriteEvents() {
		const token = localStorage.getItem('jwt');

		const response = await axios({
			method: 'GET',
			url: `${DE_FES_BASE_URL}/favorite`,
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data.data;
	}

	return <UserContext.Provider value={{ ...state, dispatch }}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error('useUser used outside of UserProvider !');

	return context;
}

export { useUser, UserProvider };
