const api = `https://hacker-news.firebaseio.com/v0`;
const json = '.json?print=pretty';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export function fetchItem(id) {
	return fetch(`${api}/item/${id}${json}`).then(res => res.json());
}

export function removeDead(posts) {
	return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

export function removeDeleted(posts) {
	return posts.filter(({ deleted }) => deleted !== true);
}
export function onlyComments(posts) {
	return posts.filter(({ type }) => type === 'comment');
}
export function onlyPosts(posts) {
	return posts.filter(({ type }) => type === 'story');
}

export function fetchMainPosts(type) {
	return (
		fetch(`${proxyUrl}${api}/${type}stories${json}`)
			//https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
			.then(res => res.json())

			.then(ids => {
				if (!ids) {
					throw new Error(`There was an error fetching the ${type} posts.`);
				}

				return ids.slice(0, 50);
			})
			.then(ids => Promise.all(ids.map(fetchItem)))
			.then(posts => removeDeleted(onlyPosts(removeDead(posts))))
	);
}

export function fetchComments(ids) {
	return Promise.all(ids.map(fetchItem)).then(comments => removeDeleted(onlyComments(removeDead(comments))));
}
