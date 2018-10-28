import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderTabItem from './OrderTabItem.jsx';

const TABS = [
	{
		id: 1,
		text: 'Shipping',
		isThereArrow: true,
	},
	{
		id: 2,
		text: 'Billing',
		isThereArrow: true,
	},
	{
		id: 3,
		text: 'Payment',
		isThereArrow: false,
	},
];

class OrderTabs extends Component {
	onTabClick(tabId) {
		const { onTabClick } = this.props;
		
		onTabClick(tabId);
	};

	render() {
		const { activeTabId, isTab2Available, isTab3Available } = this.props;
		
		return (
			<div className="order__tabs">
				{
					TABS.map(tab => {
						const isDisabled = tab.id === 1 ? false : tab.id === 2 ? !isTab2Available : !isTab3Available;
						
						return (
							<OrderTabItem
								key={tab.id}
								id={tab.id}
								isActive={activeTabId === tab.id}
								text={tab.text}
								isThereArrow={tab.isThereArrow}
								isDisabled={isDisabled}
								onClick={this.onTabClick.bind(this)}
							/>
						)
					})
				}
			</div>
		);
	}
}

OrderTabs.propTypes = {
	activeTabId: PropTypes.number.isRequired,
	onTabClick: PropTypes.func.isRequired,
	isTab2Available: PropTypes.bool.isRequired,
	isTab3Available: PropTypes.bool.isRequired,
};

export default OrderTabs;
