import PickupItem from './PickupItem.jsx';

const pickupItems = [
	{
		id: crypto.randomUUID(),
		title: 'フェスの基本情報',
		paragraph: [
			`各フェスの日程、アクセスなどの基本情報から`,
			'アーティスト日程、タイムテーブル、チケット情報をアプリひとつで売結！',
			'各フェス情報をプッシュ通話でいち早くお知らせします。',
		],
		img1: 'S__109854741_0',
		img2: 'S__109854742_0',
	},
	{
		id: crypto.randomUUID(),
		title: '初心者向けガイド . 情報',
		paragraph: [
			`会場へアクセス、クロックや更衣室の利用方法`,
			'腹袋や持ち物のアドバイス、参加者のファッションスナップなど',
			'フェスに関するあらゆる情報網羅！',
		],
		img1: 'S__109854741_0',
		img2: 'S__109854742_0',
	},
	{
		id: crypto.randomUUID(),
		title: '各フェスのレポート . コラム',
		paragraph: [
			'フェス前はフェス参加者の気になるアーティストや会場設営',
			'フェス当日は各アウト終了後からライブ写真や公演レポートをアプリに掲載。',
			'また、フェス終了後にライブ配信をしているフェスの紹介も行うので',
			'フェスに参加できなかった方も楽しんでいただけます。',
		],
		img1: 'S__109854741_0',
		img2: 'S__109854742_0',
	},
	{
		id: crypto.randomUUID(),
		title: '検索 . 絞りこみ機能',
		paragraph: [
			'各フェス日程、アクセスなどの基本情報から',
			'アーティスト日程、タイムテーブル、チケット情報をアプリひとつで売結！',
			'各フェス情報をプッシュ通話でいち早くお知らせします。',
		],
		img1: 'S__109854741_0',
		img2: 'S__109854742_0',
	},
];

export default function PickupSection() {
	return (
		<section className="pickup">
			<h2>PICK UP</h2>
			<p className="sub_header">主な機能を紹介</p>

			{pickupItems.map((pickup, i) => (
				<PickupItem
					key={pickup.id}
					itemNum={i + 1}
					title={pickup.title}
					img1={pickup.img1}
					img2={pickup.img2}
					paragraph={pickup.paragraph}
				/>
			))}
		</section>
	);
}
