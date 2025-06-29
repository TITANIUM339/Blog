export function removeTags(string) {
    return string.replace(/<[^>]*>/g, "");
}

// https://stackoverflow.com/a/7394787
export function decodeHtml(html) {
    const txt = document.createElement("textarea");

    txt.innerHTML = html;

    return txt.value;
}
