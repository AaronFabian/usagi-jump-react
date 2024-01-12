import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageLoading from './components/PageLoading.jsx';

import Home from './pages/Home.jsx';
import EventDetail from './pages/EventDetail.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		index: true,
		element: <Home />,
	},
	{
		path: '/eventDetail/:name',
		element: <EventDetail />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} fallbackElement={<PageLoading />} />;
}

export default App;
