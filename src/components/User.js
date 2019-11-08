import React from 'react';
import PostList from './PostList';
import Loading from './Loading';
import { convertDate } from '../utils';
import { fetchMainPosts, fetchItem, removeDeleted, onlyPosts, removeDead } from '../api/hackerNews';
import queryString from 'query-string';
import { Item, Header, Divider } from 'semantic-ui-react';

class User extends React.Component {
	state = {
		userInfo: {},
		posts: [],
		loading: true,
	};

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);
		const api = `https://hacker-news.firebaseio.com/v0`;
		const json = '.json?print=pretty';
		const type = 'user';

		// fetch user info
		fetch(`${api}/${type}/${id}${json}`)
			.then(res => res.json())
			.then(user => {
				this.setState({ userInfo: user });
				return user.submitted.slice(0, 50);
			})
			.then(postIDs => Promise.all(postIDs.map(fetchItem)))
			.then(posts => removeDeleted(onlyPosts(removeDead(posts))))
			.then(posts => {
				this.setState({ posts, loading: false });
			});
	}

	handleFetch() {
		this.setState({
			posts: [],
			loading: true,
		});

		fetchMainPosts();
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		if (!this.state.loading) {
			return (
				<div>
					<Divider hidden />
					<div>
						<Item.Group>
							<Item>
								<Item.Content>
									<Header as="h1">
										{this.state.userInfo.id}
									</Header>
									<Item.Meta>
										<span>
											joined{' '}
											<b>
												{convertDate(
													this.state
														.userInfo
														.created
												)}{' '}
											</b>
										</span>
										<span>
											has{' '}
											<b>
												{this.state.userInfo.karma.toLocaleString()}
											</b>{' '}
											karma
										</span>
									</Item.Meta>
								</Item.Content>
							</Item>
						</Item.Group>
					</div>
					<div>
						<Divider hidden />
						<Header as="h1">Posts</Header>
						<Divider hidden />
					</div>
					<div>
						<PostList posts={this.state.posts} />
					</div>
				</div>
			);
		}
		return <div>User</div>;
	}
}

export default User;
