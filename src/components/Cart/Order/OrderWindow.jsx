import React, { Component } from 'react';

import OrderSummary from './OrderSummary.jsx';
import OrderTabs from './OrderTabs.jsx';
import ShippingForm from '../../Common/Forms/ShippingForm/ShippingForm.jsx';
import PaymentForm from '../../Common/Forms/PaymentForm/PaymentForm.jsx';
import OrderSuccess from './OrderSuccess.jsx';

class OrderWindow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabId: 1,

			isTab2Available: false,
			isTab3Available: false,

			shippingInfo: {},
			billingInfo: {},
			paymentInfo: {},

			showTabs: true,
			showDimmer: false,
		};

		this.onTabClick = this.onTabClick.bind(this);
	}

	onTabClick(tabId) {
		this.setState({ tabId });
	};

	handleSubmitShippingInfo = (isBilling, data) => {
		if (isBilling) this.setState({ billingInfo: data, tabId: 3, isTab2Available: true, isTab3Available: true });
		else this.setState({ shippingInfo: data, tabId: 2, isTab2Available: true });
	};

	handleSubmitPaymentInfo = (data) => {
		this.setState({ paymentInfo: data, showTabs: false, showDimmer: true, tabId: 4 });
	};
	
	disableNextTabs = () => {
		this.setState({ isTab2Available: false, isTab3Available: false });
	};

	render() {
		const {
			tabId, 
			shippingInfo, 
			billingInfo, 
			isTab2Available, 
			isTab3Available,

			showDimmer,
			showTabs,
		} = this.state;
		const { email } = billingInfo;

		return (
			<div className="order__window p-0">
				<div className="order__form">
					{showTabs &&
						<OrderTabs
							onTabClick={this.onTabClick}
							activeTabId={tabId}
							isTab2Available={isTab2Available}
							isTab3Available={isTab3Available}
						/>
					}
				
					{tabId && tabId === 1 && 
						<ShippingForm
							onSubmit={this.handleSubmitShippingInfo}
							shippingInfo={shippingInfo}
							billingInfo={billingInfo}
							onFormChange={this.disableNextTabs}
						/>
					}
					{tabId && tabId === 2 &&
						<ShippingForm
							onSubmit={this.handleSubmitShippingInfo}
							shippingInfo={shippingInfo}
							billingInfo={billingInfo}
							onFormChange={this.disableNextTabs}
							isBillingForm
						/>
					}
					{tabId && tabId === 3 &&
						<PaymentForm
							onSubmit={this.handleSubmitPaymentInfo}
						/>
					}
					{tabId && tabId === 4 &&
						<OrderSuccess
							email={email}
							orderNumber="188787788"
							date="Friday 1st April 2016"
							onPrintClick={() => {}}
						/>
					}
				</div>

				<OrderSummary showDimmer={showDimmer} />
			</div>
		);
	}
}

export default OrderWindow;
