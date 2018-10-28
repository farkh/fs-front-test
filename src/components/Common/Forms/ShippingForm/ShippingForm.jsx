import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';

import { Dropdown, Input, Icon } from 'semantic-ui-react';
import { countries } from '../../../../constants/countries';
import { isPhoneValid, isZipValid, isEmailValid } from '../../../../services/validation';

class ShippingForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		shippingInfo: PropTypes.shape({
			fullName: PropTypes.string,
			phone: PropTypes.string,
			street1: PropTypes.string,
			street2: PropTypes.string,
			city: PropTypes.string,
			country: PropTypes.string,
			zip: PropTypes.string,
		}),
		billingInfo: PropTypes.shape({
			fullName: PropTypes.string,
			email: PropTypes.string,
			street1: PropTypes.string,
			street2: PropTypes.string,
			city: PropTypes.string,
			country: PropTypes.string,
			zip: PropTypes.string,
		}),
		onFormChange: PropTypes.func.isRequired,

		isBillingForm: PropTypes.bool,
	};

	static defaultProps = {
		shippingInfo: {
			fullName: '',
			phone: '',
			street1: '',
			street2: '',
			city: '',
			country: '',
			zip: '',
		},
		billingInfo: {
			fullName: '',
			email: '',
			street1: '',
			street2: '',
			city: '',
			country: '',
			zip: '',
		},

		isBillingForm: false,
	};

	state = {
		showError: false,

		fullName: '',
		phone: '',
		email: '',
		street1: '',
		street2: '',
		city: '',
		country: '',
		zip: '',
	};

	componentDidMount() {
		const { shippingInfo, billingInfo, isBillingForm } = this.props;

		if (isBillingForm) this.setState({ ...billingInfo, showError: false });
		else this.setState({ ...shippingInfo, showError: false });
	}

	getCurrentLocation = () => {
		fetch('http://ip-api.com/json')
			.then(response => response.json())
			.then((data) => {
				const { city, zip } = data;
				let { countryCode } = data;
				countryCode = countryCode.toLowerCase();
				
				this.setState({ city, country: countryCode, zip });
			})
			.catch(err => console.error(err));
	};

	handleInputChange = (e) => {
		const { id, value } = e.target;
		const { onFormChange } = this.props;

		// Disable next tabs when form edited
		onFormChange();
		this.setState({ [id]: value });
	};

	handleDropdownChange = (e, data) => {
		const { value } = data;
		
		this.setState({ country: value });
	};

	validateForm = () => {
		const {
			fullName,
			phone,
			email,
			street1,
			city,
			country,
			zip,
		} = this.state;
		const { isBillingForm } = this.props;

		if (isBillingForm && !(fullName != '' &&  isEmailValid(email) && street1 != '' && city != '' && country != '' && isZipValid(zip))) {
			this.setState({ showError: true });
			return;
		}
		
		if (!isBillingForm && !(fullName != '' && isPhoneValid(phone) && street1 != '' && city != '' && country != '' && isZipValid(zip))) {
			this.setState({ showError: true });
			return;
		}

		return true;
	};

	onFormSubmit = (e) => {
		e.preventDefault();

		const {
			fullName,
			phone,
			email,
			street1,
			street2,
			city,
			country,
			zip,
		} = this.state;
		const { onSubmit, isBillingForm } = this.props;

		if (!this.validateForm()) return;

		// TODO: send request here
		// ***
		if (isBillingForm) {
			onSubmit(isBillingForm, { fullName, email, street1, street2, city, country, zip });
			return;
		}
		
		onSubmit(isBillingForm, { fullName, phone, street1, street2, city, country, zip });
	};

	setFieldsValues = () => {
		const { shippingInfo } = this.props;

		this.setState({ ...shippingInfo, showError: false });
	};

	render() {
		const {
			showError,
			fullName,
			phone,
			street1,
			street2,
			city,
			country,
			zip,

			email,
		} = this.state;
		const { isBillingForm } = this.props;

		return (
			<React.Fragment>
				<div className="form__header">
					<h2 className="form__title">{isBillingForm ? 'Billing Info' : 'Shipping Info'}</h2>
					{isBillingForm &&
						<p
							className="form__same"
							onClick={this.setFieldsValues}
						>
							Same as shipping
						</p>
					}
				</div>

				<form className="form" onSubmit={this.onFormSubmit}>
					<div className="form__block">
						<label htmlFor="fullName" className="form__label">Recipent</label>
						<input
							type="text"
							className={`form__input mb-1 ${showError && fullName === '' ? 'form__input--invalid' : ''}`}
							id="fullName"
							placeholder="Full Name"
							autoFocus
							onChange={this.handleInputChange}
							value={fullName}
						/>

						{isBillingForm && 
							<input
								type="email"
								className={`form__input mb-1 ${showError && !isEmailValid(email) ? 'form__input--invalid' : ''}`}
								id="email"
								placeholder="Email Address"
								required
								onChange={this.handleInputChange}
								value={email}
							/>
						}

						{!isBillingForm &&
							<div className="form__inline">
								<Cleave
									placeholder="Daytime Phone"
									id="phone"
									className={`form__input mr-1 ${showError && !isPhoneValid(phone) ? 'form__input--invalid' : ''}`}
									minLength="15"
									options={{ blocks: [1, 3, 3, 2, 2], delimiter: ' ' }}
									onChange={this.handleInputChange}
									value={phone}
								/>
								<label htmlFor="phone" className="form__description">For delivery questions only</label>
							</div>
						}
					</div>

						<label htmlFor="street1" className="form__label">Address</label>

						<input
							type="text"
							className={`form__input mb-1 ${showError && street1 === '' ? 'form__input--invalid' : ''}`}
							id="street1"
							placeholder="Street Address"
							onChange={this.handleInputChange}
							value={street1}
						/>
						<input
							type="text"
							className="form__input mb-2"
							id="street2"
							placeholder="Apt, Suite, Bldg, Gate Code. (optional)"
							onChange={this.handleInputChange}
							value={street2}
						/>

					<Input
						id="city"
						className={`mb-2 ${showError && city === '' ? 'form__input--invalid' : ''}`}
						icon={<Icon name='crosshairs' link onClick={this.getCurrentLocation} />}
						placeholder="City"
						onChange={this.handleInputChange}
						value={city}
					/>

					<div className="form__inline">
						<Dropdown
							placeholder="Country"
							className={`mr-2 ${showError && country === '' ? 'form__dropdown--invalid' : ''}`}
							search
							selection
							options={countries}
							onChange={this.handleDropdownChange}
							value={country}
						/>
						<input
							type="text"
							className={`form__input ${showError && !isZipValid(zip) ? 'form__input--invalid' : ''}`}
							id="zip"
							placeholder="ZIP"
							maxLength="6"
							onChange={this.handleInputChange}
							value={zip}
						/>
					</div>

					<button
						className="btn btn--success mt-2"
						onClick={this.onFormSubmit}
					>
						Continue
					</button>
				</form>
			</React.Fragment>
		);
	}
}

export default ShippingForm;
