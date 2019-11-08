import React from 'react';
import Navbar from './Navbar';
import Posts from './Posts';
import Post from './Post';
import User from './User';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<div className="ui container">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" render={() => <Posts type="top" />} />
					<Route path="/new" render={() => <Posts type="new" />} />
					<Route path="/comments" render={() => <Post />} />
					<Route path="/post" component={Post} />
					<Route path="/user" component={User} />
					<Route render={() => <h1>404</h1>} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
