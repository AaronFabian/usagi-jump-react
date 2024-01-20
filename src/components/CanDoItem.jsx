import { Link } from 'react-router-dom';

export default function CanDoItem({ pngSrc, itemInfo, to }) {
	return (
		<div className="item_wrapper">
			<Link className="can_do_item" to={to}>
				<img src={`${pngSrc}.png`} alt={pngSrc} />
			</Link>
			<p className="item_info">{itemInfo}</p>
		</div>
	);
}
