import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {
	username: '',
	login: false,
	loading: false,
	favoriteIDs: [],
};

const reducer = function (state, action) {
	switch (action.type) {
		case 'PUSH_FAVORITE':
			return { ...state, favoriteIDs: [...state.favoriteIDs, action.payload] };

		case 'POP_FAVORITE':
			return { ...state, favoriteIDs: state.favoriteIDs.filter(id => id !== action.payload) };

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

				const response = await axios({
					method: 'POST',
					url: 'http://127.0.0.1:3000/users/check',
					headers: { Authorization: `Bearer ${token}` },
				});

				// if there is no error from the server then no let user through
				dispatch({ type: 'SET_LOGIN', payload: true });
			} catch (error) {
				console.warn(error);

				dispatch({ type: 'SET_LOGIN', payload: false });
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		}

		checkLoggedIn();
	}, []);

	return <UserContext.Provider value={{ ...state, dispatch }}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error('useUser used outside of UserProvider !');

	return context;
}

export { useUser, UserProvider };
