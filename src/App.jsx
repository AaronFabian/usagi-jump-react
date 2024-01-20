import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import EventDetail from './pages/EventDetail.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import ExploreContent from './pages/ExploreContent.jsx';

import './styles/html5reset-1.6.1.css';
import './styles/styles.css';

function App() {
	const location = useLocation();

	// <Routes />
	// : index attribute means if the route url written as '/' then use that route
	// : key attribute for framer motion to detect animation tree
	// : location attribute allow the user to click back or prev with animation in browser button

	// <Navigate />
	// : Navigate component is React router dom component
	// : "to" attribute will redirect user to intended route
	return (
		<>
			<AnimatePresence mode="wait">
				<Routes key={location.pathname} location={location}>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="home" />} />
						<Route path="home" element={<Home />} />
						<Route path="explore" element={<ExploreContent />} />
						<Route path="events/:id" element={<EventDetail />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</AnimatePresence>

			<Toaster position="top-center" toastOptions={{ success: { duration: 6000 }, error: { duration: 3000 } }} />
		</>
	);
}

export default App;

/* 
legacy code
	const router = createBrowserRouter([
		{
			path: '',
			element: <AnimatePresence mode="wait" />,
			children: [
				{
					path: '/',
					index: true,
					element: <Home />,
				},
				{
					path: '/eventDetail/:name',
					element: <EventDetail />,
				},
			],
		},
		{
			path: '*',
			element: <PageNotFound />,
		},
	]);

	return <RouterProvider router={router} fallbackElement={<PageLoading />} />;
*/
