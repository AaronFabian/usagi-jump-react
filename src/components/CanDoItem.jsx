export default function CanDoItem({ pngSrc, itemInfo }) {
	return (
		<div className="item-wrapper">
			<div className="can-do-item">
				<img src={`${pngSrc}.png`} alt={pngSrc} />
			</div>
			<p className="item-info">{itemInfo}</p>
		</div>
	);
}
