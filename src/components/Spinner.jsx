export default function Spinner({ size }) {
    return (
        <div
            className="animate-spin rounded-full border-3 border-t-teal-700 border-r-teal-100 border-b-teal-700 border-l-teal-700"
            style={{ width: size, height: size }}
        ></div>
    );
}
