import React from 'react';

/* eslint-disable react/prop-types */
export default function PickupItem({ itemNum, title, paragraph, img1, img2 }) {
	return (
		<div className="pickup_item">
			<div className="pickup_number">
				<span className="pickup_num">{`0${itemNum}`}</span>
				<p className="pickup_title">{title}</p>
			</div>

			<div className="sp_preview">
				<img className="sp_img" src={`${img1}.jpg`} alt={img1} />
				<img className="sp_img" src={`${img2}.jpg`} alt={img2} />
			</div>

			<p className="pickup_info">
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
