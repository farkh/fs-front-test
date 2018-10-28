import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'semantic-ui-react';

const OrderTabItem = ({ id, isActive, text, onClick, isDisabled, isThereArrow }) => (
	<React.Fragment>
		<p
			className={`order-tabs__tab ${isActive ? 'order-tabs__tab--active' : ''}`}
			onClick={() => {
				return !isDisabled ? onClick(id) : null
			}}
		>
			{text}
		</p>
		{isThereArrow && (
			<Icon className="order-tabs__icon" name="chevron right" />
		)}
	</React.Fragment>
);

OrderTabItem.propTypes = {
	id: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	isThereArrow: PropTypes.bool.isRequired,
};

export default OrderTabItem;
