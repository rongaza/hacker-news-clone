import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { convertDate } from '../utils';

//
const PostMeta = props => {
	const { by, time, descendants, id } = props.post;
	return (
		<Item.Meta>
			<span>
				by <Link to={`/user?id=${by}`}>{by}</Link>
			</span>
			<span>
				on {convertDate(time)} with <Link to={`/post?postid=${id}`}>{descendants}</Link>{' '}
				comments
			</span>
		</Item.Meta>
	);
};

export default PostMeta;
