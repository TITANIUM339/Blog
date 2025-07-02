import { useMutation, useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useEffect, useLayoutEffect, useState } from "react";
import { BsFillSendFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import {
    Form,
    Link,
    useActionData,
    useLoaderData,
    useNavigation,
    useRouteLoaderData,
} from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import Spinner from "../components/Spinner";
import jwt from "../lib/jwt";

export default function Post() {
    const { post, comments: c } = useLoaderData();

    const user = useRouteLoaderData("root");

    const navigation = useNavigation();

    const actionResult = useActionData();

    const client = useQueryClient();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(c);
    const [editComment, setEditComment] = useState(null);

    useLayoutEffect(() => setComments(c), [c]);

    useEffect(() => {
        if (actionResult?.success) {
            setComment("");
        }
    }, [actionResult]);

    const commentDeleteMutation = useMutation({
        async mutationFn(comment) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${post.id}/comments/${comment.id}`,
                {
                    mode: "cors",
                    method: "delete",
                    headers: { Authorization: `Bearer ${jwt.get()}` },
                },
            );

            if (!response.ok) {
                throw response;
            }
        },
        onMutate(comment) {
            const updatedComments = {
                comments: comments.filter((c) => c.id !== comment.id),
            };

            client.setQueryData(
                ["posts", post.id, "comments"],
                updatedComments,
            );
            setComments(updatedComments.comments);

            return { comments };
        },
        onError(_error, _variables, context) {
            client.setQueryData(["posts", post.id, "comments"], context);
            setComments(context.comments);

            toast("Error deleting comment", { type: "error" });
        },
        onSuccess() {
            client.invalidateQueries({
                queryKey: ["posts", post.id, "comments"],
            });
        },
    });

    const editCommentMutation = useMutation({
        async mutationFn(newComment) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${post.id}/comments/${newComment.id}`,
                {
                    mode: "cors",
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                    body: JSON.stringify({ content: newComment.content }),
                },
            );

            if (!response.ok) {
                throw response;
            }
        },
        onMutate(newComment) {
            const updatedComments = {
                comments: comments.map((c) =>
                    c.id === newComment.id
                        ? { ...c, content: newComment.content }
                        : c,
                ),
            };

            client.setQueryData(
                ["posts", post.id, "comments"],
                updatedComments,
            );
            setComments(updatedComments.comments);
            setEditComment(null);

            return [{ comments }, editComment];
        },
        onError(error, _variables, context) {
            client.setQueryData(["posts", post.id, "comments"], context[0]);
            setComments(context[0].comments);

            if (error?.status === 400) {
                setEditComment({ ...context[1], error: true });
            } else {
                toast("Error editing comment", { type: "error" });
            }
        },
        onSuccess() {
            client.invalidateQueries({
                queryKey: ["posts", post.id, "comments"],
            });
        },
    });

    return (
        <div className="flex flex-col items-center p-2">
            <div className="mt-16 mb-16 w-full max-w-[80ch]">
                <section>
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <p className="mt-4 font-medium">
                        By {post.author.firstName} {post.author.lastName}
                    </p>
                    <time className="text-gray-500" dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                </section>
                {post.thumbnail ? (
                    <img
                        className="mt-2 w-full"
                        src={post.thumbnail}
                        alt="thumbnail"
                    />
                ) : null}
                <hr className="mt-8 text-gray-300" />
                <article
                    className="mt-8"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                    }}
                ></article>
                <hr className="mt-8 text-gray-300" />
                <section className="mt-8">
                    <h2 className="text-2xl font-medium">Comments</h2>
                    {user ? (
                        <Form
                            className="mt-2 flex flex-col gap-2"
                            method="post"
                        >
                            <textarea
                                className="w-full rounded border border-gray-200 bg-white p-2 outline-teal-700"
                                name="content"
                                placeholder="Write your comment..."
                                value={comment}
                                onChange={(event) =>
                                    setComment(event.target.value)
                                }
                                aria-label="Comment"
                            ></textarea>
                            <div className="flex justify-between gap-4">
                                <div>
                                    {actionResult?.error ? (
                                        <ErrorText>
                                            comment is required
                                        </ErrorText>
                                    ) : null}
                                </div>
                                <Button
                                    type="submit"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 4,
                                    }}
                                    disabled={
                                        navigation.state === "submitting" ||
                                        navigation.state === "loading"
                                    }
                                >
                                    {navigation.state === "submitting" ||
                                    navigation.state === "loading" ? (
                                        <Spinner size={20} />
                                    ) : (
                                        <>
                                            <BsFillSendFill />
                                            Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <p>
                            <Link
                                className="font-medium text-teal-700 hover:underline"
                                to="/log-in"
                            >
                                Log in
                            </Link>{" "}
                            to post a comment.
                        </p>
                    )}
                    <div className="mt-4 border border-gray-200 bg-white shadow">
                        {comments.length ? (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="grid grid-cols-[1fr_min-content] grid-rows-[min-content_1fr] gap-2 border-gray-200 p-4 not-last:border-b"
                                >
                                    <section className="overflow-hidden">
                                        <h3 className="overflow-hidden font-medium text-ellipsis whitespace-nowrap">
                                            {comment.author.firstName}{" "}
                                            {comment.author.lastName}
                                        </h3>
                                        <time
                                            className="text-gray-500"
                                            dateTime={comment.createdAt}
                                        >
                                            {new Date(
                                                comment.createdAt,
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </section>
                                    <div className="flex items-center gap-2">
                                        {editComment?.id === comment.id ? (
                                            <>
                                                <Button
                                                    variant="secondary"
                                                    style={{ padding: 6 }}
                                                    aria-label="Cancel edit"
                                                    onClick={() =>
                                                        setEditComment(null)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    style={{ padding: 6 }}
                                                    aria-label="Save edit"
                                                    onClick={() =>
                                                        editCommentMutation.mutate(
                                                            editComment,
                                                        )
                                                    }
                                                    disabled={
                                                        (editCommentMutation.isPending &&
                                                            editCommentMutation
                                                                .variables
                                                                ?.id ===
                                                                comment.id) ||
                                                        navigation.state ===
                                                            "loading"
                                                    }
                                                >
                                                    Save
                                                </Button>
                                            </>
                                        ) : user?.id === comment.authorId ||
                                          user?.id === post.authorId ? (
                                            <>
                                                <Button
                                                    variant="secondary"
                                                    style={{ padding: 6 }}
                                                    aria-label="Edit comment"
                                                    onClick={() =>
                                                        setEditComment({
                                                            id: comment.id,
                                                            content:
                                                                comment.content,
                                                        })
                                                    }
                                                >
                                                    <BsPencilSquare />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    style={{ padding: 6 }}
                                                    aria-label="Delete comment"
                                                    onClick={() =>
                                                        commentDeleteMutation.mutate(
                                                            comment,
                                                        )
                                                    }
                                                    disabled={
                                                        navigation.state ===
                                                        "loading"
                                                    }
                                                >
                                                    <BsTrash size={18} />
                                                </Button>
                                            </>
                                        ) : null}
                                    </div>
                                    {editComment?.id === comment.id ? (
                                        <div className="col-span-3">
                                            <textarea
                                                className="w-full rounded border border-gray-200 p-2 outline-teal-700"
                                                name="content"
                                                value={editComment?.content}
                                                onChange={(event) =>
                                                    setEditComment({
                                                        ...editComment,
                                                        content:
                                                            event.target.value,
                                                    })
                                                }
                                            ></textarea>
                                            {editComment?.error ? (
                                                <ErrorText>
                                                    comment is required
                                                </ErrorText>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <p className="col-span-3 break-all">
                                            {comment.content}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <section className="pt-16 pb-16">
                                <h3 className="text-center text-2xl">
                                    No comments yet
                                </h3>
                            </section>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
