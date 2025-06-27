import { useId } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

export default function Login() {
    const usernameId = useId();
    const passwordId = useId();

    const error = useActionData();

    const navigation = useNavigation();

    return (
        <div className="flex h-full items-center justify-center">
            <FormContainer title="Log in">
                <Form
                    method="post"
                    action="/log-in"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={usernameId}
                            className="text-lg font-medium"
                        >
                            Username *
                        </label>
                        <Input
                            id={usernameId}
                            type="text"
                            placeholder="john"
                            autoComplete="username"
                            name="username"
                            required
                        />
                        {error && (
                            <ErrorText>
                                incorrect username or password
                            </ErrorText>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={passwordId}
                            className="text-lg font-medium"
                        >
                            password *
                        </label>
                        <Input
                            id={passwordId}
                            type="password"
                            placeholder="********"
                            autoComplete="current-password"
                            name="password"
                            required
                        />
                        {error && (
                            <ErrorText>
                                incorrect username or password
                            </ErrorText>
                        )}
                    </div>
                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/sign-up"
                            className="font-medium text-teal-700 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    <Button
                        style={{ display: "flex", justifyContent: "center" }}
                        type="submit"
                        disabled={
                            navigation.state === "submitting" ||
                            navigation.state === "loading"
                        }
                    >
                        {navigation.state === "submitting" ||
                        navigation.state === "loading" ? (
                            <Spinner size={24} />
                        ) : (
                            "Log in"
                        )}
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
}
