import React from 'react';
import { Item } from 'semantic-ui-react';
import PostMeta from './PostMeta';
import Title from './Title';

const Posts = ({ posts }) => {
	const renderPosts = posts => {
		return posts.map(post => {
			return (
				<Item key={post.id} className="post-item">
					<Item.Content>
						<Title post={post} />
						<PostMeta post={post} />
					</Item.Content>
				</Item>
			);
		});
	};
	return (
		<React.Fragment>
			<Item.Group>{posts.length > 0 ? renderPosts(posts) : null}</Item.Group>
		</React.Fragment>
	);
};

export default Posts;
