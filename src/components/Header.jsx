export default function Header() {
	return (
		<header className="header">
			<div className="jumbotron">
				<div className="fes-logo"></div>

				<img className="img" src="yfU.jpg" alt="jumbotron image" />
				<div className="img-filter"></div>

				<div className="jumbotron-content">
					<h1>フェスの情報を集めるならこのアプリから ！</h1>
					<div className="logo-title"></div>
					<p>大規模フェスからサーキットフェスまで</p>
					<p>全国のロックフェスに関する情報が丸わかり !</p>
				</div>

				<div className="app-launcher">
					<div className="launcher-logos">
						<img className="os-logo" src="android-launcher-logo.png" alt="android launcher logo" />
						<img className="os-logo" src="apple-launcher-logo.png" alt="apple launcher logo" />
					</div>

					<p className="min-os-version">対象OSはiOS14以上／Android8.0.0以上</p>
				</div>
			</div>
		</header>
	);
}
