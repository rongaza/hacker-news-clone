import React from 'react';
import PostList from './PostList';
import Loading from './Loading';
import { fetchMainPosts } from '../api/hackerNews';

class Posts extends React.Component {
	state = {
		posts: [],
		loading: true,
	};

	componentDidMount() {
		this.handleFetch();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.type !== this.props.type) {
			this.handleFetch();
		}
	}

	handleFetch() {
		this.setState({
			posts: [],
			loading: true,
		});

		fetchMainPosts(this.props.type).then(posts =>
			this.setState({
				posts: posts,
				loading: false,
			})
		);
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		return (
			<div>
				<PostList posts={this.state.posts} />
			</div>
		);
	}
}

export default Posts;
