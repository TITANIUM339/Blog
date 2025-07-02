import jwt from "./jwt";

export function getUser() {
    return {
        queryKey: ["user", jwt.get()],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/user`,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                },
            );

            if (response.status === 401) {
                return null;
            }

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
    };
}

export function getPosts(search) {
    return {
        queryKey: ["posts", search],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts${search ? `?search=${search}` : ""}`,
                { mode: "cors" },
            );

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
        staleTime: 5 * 60 * 1000,
    };
}

export function getPost(id) {
    return {
        queryKey: ["posts", id],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${id}`,
                {
                    mode: "cors",
                    headers: { Authorization: `Bearer ${jwt.get()}` },
                },
            );

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
        staleTime: 10 * 60 * 1000,
    };
}

export function getComments(postId) {
    return {
        queryKey: ["posts", postId, "comments"],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
                {
                    mode: "cors",
                    headers: { Authorization: `Bearer ${jwt.get()}` },
                },
            );

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
        staleTime: 2 * 60 * 1000,
    };
}
