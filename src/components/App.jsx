import React from 'react';

import Header from './Common/Header/Header.jsx';
import OrderWorkspace from './Common/OrderWorkspace/OrderWorkspace.jsx';

import styles from './Common/scss/bundle.scss';

const App = () => (
	<div className="test-app">
		<Header />

		<OrderWorkspace />
	</div>
);

export default App;
