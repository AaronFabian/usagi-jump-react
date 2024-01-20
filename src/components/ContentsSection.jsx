import CanDoItem from './CanDoItem.jsx';

const canDoListItems = [
	{
		id: crypto.randomUUID(),
		src: '_i_icon_00223_icon_002232_256',
		info: '各フェス情報',
		link: '/explore',
	},
	{
		id: crypto.randomUUID(),
		src: '_i_icon_00235_icon_002352_256',
		info: 'グッズ情報',
		link: '/eventDetail/Aaron',
	},
	{
		id: crypto.randomUUID(),
		src: '_i_icon_00039_icon_000392_256',
		info: 'ジャンル検索',
		link: '#',
	},
	{
		id: crypto.randomUUID(),
		src: '_i_icon_10987_icon_109872_256',
		info: 'ガイドマップ',
		link: '#',
	},
	{
		id: crypto.randomUUID(),
		src: '_i_icon_00009_icon_000092_256',
		info: 'コラム',
		link: '#',
	},
];

export default function ContentsSection() {
	return (
		<>
			<section className="contents">
				<h2>CONTENTS</h2>
				<p className="sub_header">【FES de ジャンプ】 アプリでできること</p>

				<div className="can_do_list">
					{canDoListItems.map(canDo => (
						<CanDoItem key={canDo.id} pngSrc={canDo.src} itemInfo={canDo.info} to={canDo.link} />
					))}
				</div>
			</section>
		</>
	);
}
