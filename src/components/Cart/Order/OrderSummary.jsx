import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { orders } from '../../../../data/orders';
import OrderList from './OrderList.jsx';
import OrderAmount from './OrderAmount.jsx';

class OrderSummary extends Component {
	static propTypes = {
		showDimmer: PropTypes.bool.isRequired,
	};

	state = {
		orders: null,
	};
	
	componentDidMount() {
		this.setState({ orders: orders[0] });
	}
	
	render() {
		const { orders } = this.state;
		const { showDimmer } = this.props;

		return (
			<div className="order__summary">
				{showDimmer && <div className="order__dimmer" />}
				<div className="summary__header">
					<h3 className="summary__title m-0">Order Summary</h3>
					<a href="javascript:void(0)" className="summary__link">edit order</a>
				</div>

				{orders && <OrderList orderItems={orders.items} />}
				{orders && <OrderAmount orderId={orders.id} />}

				<p className="order__copyright">
					All purchases are subject to our <a href="javascript:void(0)">Terms and Conditions</a>.
				</p>
			</div>
		);
	}
}

export default OrderSummary;
