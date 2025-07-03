import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { loginUser, logoutUser, postComment, signupUser } from "./lib/actions";
import { loadPostAndComments, loadPosts, loadUser } from "./lib/loaders";
import Error from "./pages/Error";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import "./styles/style.css";
import Home from "./pages/Home";
import Post from "./pages/Post";

const client = new QueryClient();

const router = createBrowserRouter(
    [
        {
            path: "/",
            id: "root",
            element: <Root />,
            errorElement: <Error />,
            hydrateFallbackElement: <Loading />,
            loader: loadUser(client),
            children: [
                {
                    index: true,
                    element: <Home />,
                    loader: loadPosts(client),
                },
                {
                    path: "posts/:postId",
                    element: <Post />,
                    loader: loadPostAndComments(client),
                    action: postComment(client),
                },
                {
                    path: "sign-up",
                    element: <Signup />,
                    action: signupUser(client),
                },
                {
                    path: "log-in",
                    element: <Login />,
                    action: loginUser(client),
                },
                { path: "log-out", action: logoutUser(client) },
            ],
        },
    ],
    { basename: "/Blog/" },
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
