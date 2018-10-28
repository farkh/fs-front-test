import React from 'react';
import PropTypes from 'prop-types';

const OrderListItem = ({ orderItem }) => {
	const { color, price, title, imgUrl, quantity } = orderItem;

	return (
		<div className="order-list__item">
			<img src={imgUrl} alt={title} className="order-list__img" />

			<div className="order-list__info">
				<div className="order-list__product-header">
					<p className="order-list__product-title m-0">{title}</p>
					<span className="order-list__product-price m-0">${price}</span>
				</div>

				<p className="order-list__product-color m-0">{color}</p>
				<p className="order-list__product-quantity m-0">Quantity: {quantity}</p>
			</div>
		</div>
	);
}

OrderListItem.propTypes = {
	orderItem: PropTypes.shape({
		color: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		imgUrl: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderListItem;
