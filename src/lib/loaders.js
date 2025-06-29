import { getPosts, getUser } from "./queries";

export function loadUser(client) {
    return async () => await client.ensureQueryData(getUser());
}

export function loadPosts(client) {
    return async ({ request }) =>
        await client.fetchQuery(
            getPosts(new URL(request.url).searchParams.get("search")),
        );
}
