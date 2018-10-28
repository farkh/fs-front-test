import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';
import creditCardType from 'credit-card-type';

import { isCardValid, isExpireDateValid, isSecurityCodeValid, isCardholderNameValid } from '../../../../services/validation';

import SecureIcon from '../../../../images/secure.svg';
import VisaLogo from '../../../../images/visa-logo.svg';
import MastercardLogo from '../../../../images/mastercard-logo.svg';
import DiscoverLogo from '../../../../images/discover-logo.svg';

class PaymentForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		showError: false,
		
		cardholderName: '',
		cardNumber: '',
		expireDate: '',
		securityCode: '',

		cardType: '',
	};

	handleInputChange = (e) => {
		let { id, value } = e.target;

		if (id === 'cardholderName') value = value.toUpperCase();
		
		if (id === 'cardNumber' && value.length >= 4) {
			const identifier = value.substr(0, 4);
			const creditCardInfo = creditCardType(identifier);

			if (creditCardInfo.length === 0) {
				this.setState({ [id]: value });
				return;
			}

			this.setState({ showError: false, isCardValid: true, cardType: creditCardInfo[0].type });
		}
		
		this.setState({ [id]: value });
	};

	validateForm = () => {
		const {
			cardholderName,
			cardNumber,
			expireDate,
			securityCode,
		} = this.state;

		if (!(isCardholderNameValid(cardholderName) &&  isCardValid(cardNumber) &&  isExpireDateValid(expireDate) && isSecurityCodeValid(securityCode))) {
			this.setState({ showError: true });
			return;
		}

		return true;
	};

	onFormSubmit = (e) => {
		e.preventDefault();

		const {
			cardholderName,
			cardNumber,
			expireDate,
			securityCode,
		} = this.state;
		const { onSubmit } = this.props;

		if (!this.validateForm()) return;

		// TODO: send request here
		// ***
		onSubmit({ cardholderName, cardNumber, expireDate, securityCode });
	};

	render() {
		const {
			showError,
			cardType,
			cardholderName,
			cardNumber,
			expireDate,
			securityCode
		} = this.state;

		return (
			<React.Fragment>
				<div className="form__header">
					<h2 className="form__title">Payment</h2>
				</div>

				<div className="form__caveat mb-2">
					<img src={SecureIcon} alt="secure" />
					<p className="form__caveat-text">This is a secure 128-bit SSL encrypted payment</p>
				</div>

				<form className="form" onSubmit={this.onFormSubmit}>
					<label htmlFor="cardholderName" className="form__label">Cardholder Name</label>
					<input
						type="text"
						className={`form__input mb-2 ${showError && !isCardholderNameValid(cardholderName) ? 'form__input--invalid' : ''}`}
						id="cardholderName"
						placeholder="Name is at appears on your card"
						autoFocus
						onChange={this.handleInputChange}
						value={cardholderName}
					/>

					<label htmlFor="cardNumber" className="form__label">Card Number</label>
					<div className="form__icon-input mb-2">
						<Cleave
							placeholder="XXXX XXXX XXXX XXXX"
							id="cardNumber"
							className={`form__input ${showError && !isCardValid(cardNumber) ? 'form__input--invalid' : ''}`}
							minLength="15"
							options={{ blocks: [4, 4, 4, 4], delimiter: ' ' }}
							onChange={this.handleInputChange}
							value={cardNumber}
						/>

						{cardType && cardType != '' && 
							cardType === 'visa' ?
								<img className="form__icon-input-img" src={VisaLogo} alt="" />
							: cardType === 'discover' ?
								<img src={DiscoverLogo} alt="" className="form__icon-input-img" />
							: cardType === 'mastercard' ?
								<img src={MastercardLogo} alt="" className="form__icon-input-img" />
							: ''
						}
					</div>

					<div className="form__inline">
						<div className="form__field">
							<label htmlFor="expireDate" className="form__label">Expire Date</label>
							<Cleave
								placeholder="MM / YY"
								id="expireDate"
								className={`form__input ${showError && !isExpireDateValid(expireDate) ? 'form__input--invalid' : ''}`}
								options={{ blocks: [2, 2], delimiter: ' / ' }}
								onChange={this.handleInputChange}
								value={expireDate}
							/>
						</div>
						
						<div className="form__field">
							<label htmlFor="expireDate" className="form__label">Security Code</label>
							<Cleave
								type="text"
								className={`form__input ${showError && !isSecurityCodeValid(securityCode) ? 'form__input--invalid' : ''}`}
								id="securityCode"
								options={{ blocks: [3], delimiter: '' }}
								maxLength="3"
								onChange={this.handleInputChange}
								value={securityCode}
							/>
						</div>
					</div>

					<button
						className="btn btn--success mt-2"
						onClick={this.onFormSubmit}
					>
						Pay Securely
					</button>
				</form>

			</React.Fragment>
		);
	}
}

export default PaymentForm;
