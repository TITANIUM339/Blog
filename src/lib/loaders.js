import { getComments, getPost, getPosts, getUser } from "./queries";

export function loadUser(client) {
    return async () => await client.ensureQueryData(getUser());
}

export function loadPosts(client) {
    return async ({ request }) =>
        await client.fetchQuery(
            getPosts(new URL(request.url).searchParams.get("search")),
        );
}

export function loadPostAndComments(client) {
    return async ({ params }) => {
        const [{ post }, { comments }] = await Promise.all([
            client.fetchQuery(getPost(params.postId)),
            client.fetchQuery(getComments(params.postId)),
        ]);

        return { post, comments };
    };
}
