const BASE_URL = "https://692595b882b59600d7243f82.mockapi.io/api";

async function request(method, url, data, token) {
    const options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Request failed");
    }

    return response.json();
}

export const api = {
    get: (url) => request("GET", url),
    post: (url, data, token) => request("POST", url, data, token),
    put: (url, data, token) => request("PUT", url, data, token),
    delete: (url, token) => request("DELETE", url, null, token),
};