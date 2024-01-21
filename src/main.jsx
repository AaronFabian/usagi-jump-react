import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/userProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.Fragment>
		<UserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserProvider>
	</React.Fragment>
);
