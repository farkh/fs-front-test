import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderAmount extends Component {
	componentDidMount() {
		// fetch here order info (amount, shipping, taxes, etc.)
	}

	render() {
		// Order info
		// const { orderInfo } = this.state;
		// const { subtotal, shippingPrice, taxes, total } = orderInfo;
		
		return (
			<div className="order__amount">
				<div className="order-amount__info">
					<div className="order-amount__item">
						<p className="order-amount__item-name">Subtotal</p>
						{/* ${subtotal} */}
						<p className="order-amount__item-value">$398</p>
					</div>

					<div className="order-amount__item">
						<p className="order-amount__item-name">Shipping</p>
						{/* {shippingPrice != 0 ? `$${shippingPrice}` : 'Free'} */}
						<p className="order-amount__item-value">Free</p>
					</div>

					<div className="order-amount__item">
						<p className="order-amount__item-name">Taxes</p>
						{/* ${taxes} */}
						<p className="order-amount__item-value">$12.12</p>
					</div>
				</div>

				<div className="order-amount__total">
					<div className="order-amount__total-name">Total</div>
					{/* ${total} */}
					<p className="order-amount__total-value">$410.12</p>
				</div>
			</div>
		);
	}
}

OrderAmount.propTypes = {
	orderId: PropTypes.string.isRequired,
};

export default OrderAmount;
