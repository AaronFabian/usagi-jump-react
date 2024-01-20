export default function Footer() {
	return (
		<footer>
			<p className="footer_text">
				【Fes de ジャンプ】の公式アプリを
				<br />
				今すぐダウンロード！
			</p>

			<div className="download">
				<img src="usagi_footer.png" alt="アプリアイコン" className="usagi_icon" />

				<img src="fesdejump.png" alt="アプリ文字" className="usagi_text" />
			</div>

			<div className="download_icon">
				<img src="apple-launcher-logo.png" alt="appleダウンロード" />
				<img src="android-launcher-logo.png" alt="androidダウンロード" />
			</div>
		</footer>
	);
}
