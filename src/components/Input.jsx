import { createElement } from "react";

export default function Input({ element = "input", children, ...props }) {
    return createElement(
        element,
        {
            className: "rounded-md border border-gray-300 p-1 outline-teal-700",
            ...props,
        },
        children,
    );
}
