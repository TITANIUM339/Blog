export default function HeadingContainer({ children }) {
    return (
        <div className="relative bg-teal-50">
            <div className="relative z-1">{children}</div>
            <div className="absolute bottom-0 left-0 grid h-[60%] w-[30%] grid-rows-3">
                <div className="w-[25%] origin-left animate-[scale_1s_ease-out] bg-teal-200"></div>
                <div className="w-[50%] origin-left animate-[scale_1s_ease-out] bg-teal-400"></div>
                <div className="w-full origin-left animate-[scale_1s_ease-out] bg-teal-600"></div>
            </div>
            <div className="absolute top-0 right-0 grid h-[60%] w-[30%] grid-rows-3 justify-items-end">
                <div className="w-full origin-right animate-[scale_1s_ease-out] bg-teal-600"></div>
                <div className="w-[50%] origin-right animate-[scale_1s_ease-out] bg-teal-400"></div>
                <div className="w-[25%] origin-right animate-[scale_1s_ease-out] bg-teal-200"></div>
            </div>
        </div>
    );
}
