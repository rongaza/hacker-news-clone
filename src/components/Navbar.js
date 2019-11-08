import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const activeStyle = {
	color: 'rgb(187, 46, 31)',
};

const Navbar = () => {
	return (
		<nav>
			<Menu text>
				<Menu.Item>
					<NavLink to="/" exact activeStyle={activeStyle} className="nav-link">
						<h2>Top</h2>
					</NavLink>
				</Menu.Item>

				<Menu.Item>
					<NavLink to="/new" exact activeStyle={activeStyle} className="nav-link">
						<h2>New</h2>
					</NavLink>
				</Menu.Item>
			</Menu>
		</nav>
	);
};

export default Navbar;
