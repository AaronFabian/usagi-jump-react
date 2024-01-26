import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { useUser } from '../context/UserProvider.jsx';
import { DE_FES_BASE_URL } from '../api/deFesApi.jsx';
import toast from 'react-hot-toast';

export default function Header() {
	const navigate = useNavigate();
	const { login: isLoggedIn } = useUser();
	const [isLoggingOut, setLoggingOut] = useState(false);

	async function handleLogout(e) {
		e.preventDefault();

		try {
			setLoggingOut(true);

			const token = localStorage.getItem('jwt');

			await axios({
				url: `${DE_FES_BASE_URL}/users/logout`,
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			});

			// since we don't have cookies then set delete jwt manually at localStorage
			localStorage.removeItem('jwt');

			// give nice toast ui
			toast.success('Logged out');

			// refresh the page
			setTimeout(() => navigate(0), 1500);
		} catch (error) {
			console.log(error);
			toast.error('something gone wrong while logging out');
			setLoggingOut(false);
		}
	}

	return (
		<header className="header">
			<div className="login_wrapper">
				{isLoggedIn && (
					<>
						<Link className="favorite_btn" to="/favorite" title="favorite event list">
							<FaStar />
						</Link>

						<button className="logout_btn" title="logout" onClick={handleLogout} disabled={isLoggingOut}>
							<RiLogoutBoxRLine />
						</button>
					</>
				)}

				{!isLoggedIn && (
					<>
						<Link className="login" to="/login">
							Login
						</Link>
						<Link className="login" to="/register">
							Register
						</Link>
					</>
				)}
			</div>

			<div className="jumbotron">
				<div className="fes_logo">
					<Link to="/home">
						<img src="mainlogo.png" alt="fes de jump logo" />
					</Link>
				</div>

				<img className="bg_img" src="yfU.jpg" alt="jumbotron image" />
				<div className="img_filter"></div>

				<div className="jumbotron_content">
					<h1>フェスの情報を集めるならこのアプリから ！</h1>
					<div className="logo_title">
						<img src="usagi_footer.png" alt="fes de small logo" className="logo_sub2" />
						<img src="fesdejump.png" alt="fes de jump full" className="logo_full" />
					</div>
					<p>大規模フェスからサーキットフェスまで</p>
					<p>全国のロックフェスに関する情報が丸わかり !</p>
				</div>

				<div className="app_launcher">
					<div className="launcher_logos">
						<img className="os_logo" src="android-launcher-logo.png" alt="android launcher logo" />
						<img className="os_logo" src="apple-launcher-logo.png" alt="apple launcher logo" />
					</div>

					<p className="min_os_version">対象OSはiOS14以上／Android8.0.0以上</p>
				</div>
			</div>
		</header>
	);
}
