import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header className="header">
			<div className="login_wrapper">
				<Link className="login" to="/login">
					Login
				</Link>
				<Link className="login" to="/register">
					Register
				</Link>
			</div>

			<div className="jumbotron">
				<div className="fes_logo">
					<img src="usagi_footer.png" alt="fes de jump logo" />
				</div>

				<img className="bg_img" src="yfU.jpg" alt="jumbotron image" />
				<div className="img_filter"></div>

				<div className="jumbotron_content">
					<h1>フェスの情報を集めるならこのアプリから ！</h1>
					<div className="logo_title">
						<img src="fesdejump.png" alt="fes de jump full" />
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
