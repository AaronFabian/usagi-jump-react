import React from 'react';

/* eslint-disable react/prop-types */
export default function PickupItem({ itemNum, title, paragraph, img1, img2 }) {
	return (
		<div className="pickup-item">
			<div className="pickup-number">
				<span className="pickup-num">{`0${itemNum}`}</span>
				<p className="pickup-title">{title}</p>
			</div>

			<div className="sp-preview">
				<img className="sp-img" src={`${img1}.jpg`} alt={img1} />
				<img className="sp-img" src={`${img2}.jpg`} alt={img2} />
			</div>

			<p className="pickup-info">
				{paragraph.map((p, index) => (
					<React.Fragment key={index}>
						{p}
						<br />
					</React.Fragment>
				))}
			</p>
		</div>
	);
}
