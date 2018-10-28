import React from 'react';

const OrderSuccess = ({ email, orderNumber, date, onPrintClick }) => {

	return (
		<div className="order__success">
			<h2 className="order__success-title">Thank you for your order!</h2>

			<p className="order__success-number mb-1">Order number is: {orderNumber}</p>
			<p className="order__success-text">
				Your will recieve an email confirmation shortly to&nbsp;
				<a className="order__success-email" href={`mailto:${email}`}>{email}</a>
			</p>
		
			<p className="order__success-text">
				Estimated delivery Day is<br />
				<span className="order__success-date">{date}</span>
			</p>

			<a
				href="#"
				className="order__success-link"
				onClick={onPrintClick}
			>
				Print Recipe
			</a>
		</div>
	);
};

export default OrderSuccess;
