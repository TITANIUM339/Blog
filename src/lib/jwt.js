export default {
    get() {
        return localStorage.getItem("token");
    },
    set(token) {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    },
};
