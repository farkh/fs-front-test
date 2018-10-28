import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderListItem from './OrderListItem.jsx';

class OrderList extends Component {
	render() {
		const { orderItems } = this.props;
		
		return (
			<div className="order__list">
				{orderItems && orderItems.map((orderItem, index) => (
					<OrderListItem key={index} orderItem={orderItem} />
				))}
			</div>
		);
	}
}

OrderList.propTypes = {
	orderItems: PropTypes.arrayOf(PropTypes.shape({
		color: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		imgUrl: PropTypes.string.isRequired,
	})).isRequired,
};

export default OrderList;
