import AppLayout from '../ui/AppLayout.jsx';
import Footer from '../ui/Footer.jsx';
import Header from '../ui/Header.jsx';
import Main from '../ui/Main.jsx';

// import styles from '../styles/home.module.css';

export default function Home() {
	return (
		<AppLayout>
			<Header />
			<Main />
			<Footer />
		</AppLayout>
	);
}

// <h1>Home</h1>
// <Link to={'/eventDetail/Aaron'}>Test</Link>
