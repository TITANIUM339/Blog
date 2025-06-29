import { BsBoxArrowUpRight, BsImage, BsSearch } from "react-icons/bs";
import { Form, Link, useLoaderData, useSubmit } from "react-router";
import Container from "../components/Container";
import HeadingContainer from "../components/HeadingContainer";
import Input from "../components/Input";
import { decodeHtml, removeTags } from "../lib/utils";
import Button from "../components/Button";

export default function Home() {
    const { posts } = useLoaderData();

    const submit = useSubmit();

    return (
        <div className="grid h-full grid-rows-[min-content_1fr]">
            <HeadingContainer>
                <section className="flex flex-col items-center gap-6 pt-16 pr-2 pb-16 pl-2 text-center">
                    <h1 className="text-4xl font-medium text-teal-900">
                        Resources and insights
                    </h1>
                    <p className="text-lg text-teal-700">
                        The latest industry news, interviews, technologies, and
                        resources.
                    </p>
                    <Form
                        className="flex items-center gap-2"
                        onChange={(event) => submit(event.currentTarget)}
                    >
                        <Input
                            name="search"
                            aria-label="Search"
                            placeholder="Search"
                            style={{ backgroundColor: "white" }}
                        />
                        <Button
                            variant="secondary"
                            aria-label="Search"
                            type="submit"
                            style={{ padding: 6 }}
                        >
                            <BsSearch size={20} />
                        </Button>
                    </Form>
                </section>
            </HeadingContainer>
            <Container>
                {posts.length ? (
                    <ul className="grid grid-cols-1 gap-8 pt-16 pr-2 pb-16 pl-2 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="grid grid-rows-[250px_1fr_min-content] gap-4 bg-white p-4 shadow"
                            >
                                <div className="overflow-hidden">
                                    {post.thumbnail ? (
                                        <img
                                            className="h-full w-full object-cover"
                                            src={post.thumbnail}
                                            alt="thumbnail"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gray-100">
                                            <BsImage size={100} />
                                        </div>
                                    )}
                                </div>
                                <div className="overflow-hidden">
                                    <Link
                                        to={`/posts/${1}`}
                                        className="flex items-center justify-between text-xl font-medium hover:text-gray-700"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                            {post.title}
                                        </span>
                                        <span>
                                            <BsBoxArrowUpRight />
                                        </span>
                                    </Link>
                                    <p className="text-gray-500">
                                        {decodeHtml(
                                            post.content.length > 100
                                                ? `${removeTags(post.content).substring(0, 100)}...`
                                                : removeTags(post.content),
                                        )}
                                    </p>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="overflow-hidden font-medium text-ellipsis whitespace-nowrap">
                                        {post.author.firstName}{" "}
                                        {post.author.lastName}
                                    </p>
                                    <p className="text-gray-500">
                                        {new Date(
                                            post.createdAt,
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <h2 className="text-2xl">Nothing to see here</h2>
                    </div>
                )}
            </Container>
        </div>
    );
}
