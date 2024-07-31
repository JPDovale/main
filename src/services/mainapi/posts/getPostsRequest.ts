import { connection } from "../axiosConfig";

export interface Post {
	id: string;
	title: string;
	slug: string;
	content: string;
	summary: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

interface PostsResponse {
	posts: Post[];
}

interface PostsRequest {
	tag: string;
}

export async function getPostsRequest({ tag }: PostsRequest = { tag: "" }) {
	let route = "/posts";

	if (tag) {
		route += `?tag=${tag}`;
	}

	return await connection.get<PostsResponse>(route);
}
