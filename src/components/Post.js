import React from 'react';
import Title from './Title';
import queryString from 'query-string';
import { fetchComments, fetchItem } from '../api/hackerNews';
import PostMeta from './PostMeta';
import { Item, Segment } from 'semantic-ui-react';
import '../styles/style.css';

class Post extends React.Component {
	state = {
		post: {},
		comments: [],
		loading: true,
		ids: [],
	};

	componentDidMount() {
		const { postid } = queryString.parse(this.props.location.search);

		fetchItem(postid)
			.then(item => {
				this.setState({ post: item });
				return fetchComments(item.kids || []);
			})
			.then(results =>
				this.setState({
					comments: results,
					loading: false,
				})
			);
	}

	renderComments() {
		return this.state.comments.map(comment => {
			return (
				<Segment className="comment" key={comment.id}>
					<Item.Group divided>
						<Item>
							<Item.Content>
								<Item.Header as="h5">
									{' '}
									<PostMeta post={comment} />
								</Item.Header>
								<Item.Description>
									<p
										dangerouslySetInnerHTML={{
											__html: comment.text,
										}}
									/>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			);
		});
	}

	render() {
		if (this.state.loading) {
			return <div>Loading</div>;
		}

		return (
			<div>
				<Item.Group>
					<Item>
						<Item.Content>
							<Title post={this.state.post} />
							<PostMeta post={this.state.post} />
						</Item.Content>
					</Item>
				</Item.Group>
				{this.renderComments()}
			</div>
		);
	}
}

export default Post;
