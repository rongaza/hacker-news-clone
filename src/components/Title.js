import React from 'react';
import { Item } from 'semantic-ui-react';

const Title = props => {
	const { url, title } = props.post;
	return (
		<Item.Header as="h1">
			<a href={url}>{title}</a>
		</Item.Header>
	);
};

export default Title;
