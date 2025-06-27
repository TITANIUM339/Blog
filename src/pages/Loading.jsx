import Spinner from "../components/Spinner";

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner size={50} />
        </div>
    );
}
