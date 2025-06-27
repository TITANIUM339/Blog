import HeadingContainer from "./HeadingContainer";

export default function FormContainer({ title, children, size = "s" }) {
    return (
        <div
            className={`grid-rows[min-content_1fr] grid w-full ${size === "s" ? "max-w-md" : "max-w-2xl"} shadow-lg`}
        >
            <HeadingContainer>
                <div className="pt-6 pr-2 pb-6 pl-2">
                    <h1 className="text-center text-xl font-medium text-teal-900">
                        {title}
                    </h1>
                </div>
            </HeadingContainer>
            {children}
        </div>
    );
}
