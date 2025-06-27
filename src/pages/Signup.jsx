import { useId } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

export default function Signup() {
    const firstNameId = useId();
    const lastNameId = useId();
    const usernameId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();

    const { errors } = useActionData() || {};

    const navigation = useNavigation();

    const errorMessages = {};

    errors?.forEach((error) => (errorMessages[error.path] = error.msg));

    return (
        <div className="flex h-full items-center justify-center">
            <FormContainer title="Sign up">
                <Form
                    method="post"
                    action="/sign-up"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={firstNameId}
                            className="text-lg font-medium"
                        >
                            First name *
                        </label>
                        <Input
                            id={firstNameId}
                            type="text"
                            placeholder="John"
                            autoComplete="given-name"
                            autoCapitalize="on"
                            name="firstName"
                            required
                        />
                        {errorMessages.firstName && (
                            <ErrorText>{errorMessages.firstName}</ErrorText>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={lastNameId}
                            className="text-lg font-medium"
                        >
                            Last name *
                        </label>
                        <Input
                            id={lastNameId}
                            type="text"
                            placeholder="Smith"
                            autoComplete="family-name"
                            autoCapitalize="on"
                            name="lastName"
                            required
                        />
                        {errorMessages.lastName && (
                            <ErrorText>{errorMessages.lastName}</ErrorText>
                        )}
                    </div>
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
                        {errorMessages.username && (
                            <ErrorText>{errorMessages.username}</ErrorText>
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
                            autoComplete="new-password"
                            name="password"
                            required
                        />
                        {errorMessages.password && (
                            <ErrorText>{errorMessages.password}</ErrorText>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={confirmPasswordId}
                            className="text-lg font-medium"
                        >
                            Confirm password *
                        </label>
                        <Input
                            id={confirmPasswordId}
                            type="password"
                            placeholder="********"
                            autoComplete="new-password"
                            name="confirmPassword"
                            required
                        />
                        {errorMessages.confirmPassword && (
                            <ErrorText>
                                {errorMessages.confirmPassword}
                            </ErrorText>
                        )}
                    </div>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            to="/log-in"
                            className="font-medium text-teal-700 hover:underline"
                        >
                            Log in
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
                            "Sign up"
                        )}
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
}
