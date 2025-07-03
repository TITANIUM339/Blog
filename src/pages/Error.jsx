import { Link, useRouteError } from "react-router";
import Button from "../components/Button";
import jwt from "../lib/jwt";

export default function Error() {
    const error = useRouteError();

    console.error(error);

    if (error.status === 401) {
        jwt.set();
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
                <section>
                    <h1 className="text-3xl font-medium text-teal-700">
                        {error.status
                            ? error.status
                            : "An unexpected error occurred"}
                    </h1>
                    <p className="text-lg">{error.statusText || error.data}</p>
                </section>
                <Button Component={Link} to="/" replace>
                    Go back home
                </Button>
            </div>
        </div>
    );
}
