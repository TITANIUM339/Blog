import { BsBoxArrowUpRight, BsGithub } from "react-icons/bs";
import { Form, Link, Outlet, useLoaderData } from "react-router";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";
import Container from "../components/Container";

export default function Root() {
    const user = useLoaderData();

    return (
        <>
            <div className="grid min-h-screen grid-rows-[min-content_1fr_min-content] bg-gray-50 text-gray-800">
                <header className="bg-teal-800">
                    <Container>
                        <div className="flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <Link
                                    to="/"
                                    className="text-2xl font-medium text-gray-50"
                                >
                                    Blog
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-end gap-2 self-end">
                                <Button
                                    variant="secondary"
                                    Component={Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    to={import.meta.env.VITE_BLOG_ADMIN_URL}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        color: "var(--color-gray-50)",
                                    }}
                                >
                                    Manage my blogs <BsBoxArrowUpRight />
                                </Button>
                                {user ? (
                                    <Form
                                        method="post"
                                        action="/log-out"
                                        navigate={false}
                                    >
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            style={{
                                                color: "var(--color-gray-50)",
                                            }}
                                        >
                                            Log out
                                        </Button>
                                    </Form>
                                ) : (
                                    <>
                                        <Button
                                            Component={Link}
                                            to="/log-in"
                                            variant="secondary"
                                            style={{
                                                color: "var(--color-gray-50)",
                                            }}
                                        >
                                            Log in
                                        </Button>
                                        <Button Component={Link} to="/sign-up">
                                            Sign up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Container>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer className="flex items-center justify-center gap-2 p-2">
                    Copyright © TITANIUM339 {new Date().getFullYear()}
                    <Link
                        to="https://github.com/TITANIUM339"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-125"
                    >
                        <BsGithub />
                    </Link>
                </footer>
            </div>
            <ToastContainer />
        </>
    );
}
