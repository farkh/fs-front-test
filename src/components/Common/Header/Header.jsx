import React from 'react';

import Logo from '../../../images/logo.svg';
import CartIcon from '../../../images/cart.svg';

const Header = () => (
	<div className="header">
		<div className="header__logo">
			<img src={Logo} alt="Logo" />
			<div className="header__logo-text">Front-end Developer Test Task</div>
		</div>

		<div className="header__cart">
			<p className="header__cart-text">cart</p>
			
			<div className="header__cart-icon">
				<img src={CartIcon} alt="Cart" />

				{true &&
					<div className="cart-badge">
						<span className="cart-badge__count">3</span>
					</div>
				}
			</div>
		</div>
		
	</div>
);

export default Header;
