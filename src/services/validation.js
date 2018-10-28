export const isPhoneValid = (phone) => {
	// validate only RU numbers (sorry)
	return phone.length === 15;
};

export const isZipValid = (zip) => {
	return zip.length === 6;
};

export const isEmailValid = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const isCardValid = (cardNumber) => {
	// just test validation :/
	return cardNumber.length === 19;
};

export const isExpireDateValid = (expireDate) => {
	const month = expireDate.split(' / ')[0];
	const year = expireDate.split(' / ')[1];
	let currentYear = new Date().getFullYear();
	currentYear = currentYear.toString().substr(2);

	// нет времени для более сложной/правильной валидации :(
	if (!(/^\d+$/.test(month)) || +month > 12) return false;
	if (!(/^\d+$/.test(year)) || +year < currentYear) return false;

	return true;
};

export const isSecurityCodeValid = (securityCode) => {
	return securityCode.length === 3;
};

export const isCardholderNameValid = (name) => {
	return name.length > 2;
};
