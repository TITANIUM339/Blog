export default function Button({
    variant = "primary",
    Component,
    children,
    ...props
}) {
    const variantClasses = {
        primary:
            "rounded-md bg-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-700 transition-colors duration-200 hover:not-disabled:cursor-pointer hover:not-disabled:bg-teal-100",
        secondary:
            "rounded-md pt-1 pr-3 pb-1 pl-3 font-medium transition-colors duration-200 hover:not-disabled:cursor-pointer hover:not-disabled:bg-[rgba(0,0,0,0.1)]",
        danger: "rounded-md pt-1 pr-3 pb-1 pl-3 font-medium text-red-700 transition-colors duration-200 hover:not-disabled:cursor-pointer hover:not-disabled:bg-[rgba(0,0,0,0.1)]",
    }[variant];

    return Component ? (
        <Component className={variantClasses} {...props}>
            {children}
        </Component>
    ) : (
        <button className={variantClasses} {...props}>
            {children}
        </button>
    );
}
