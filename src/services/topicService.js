import { api } from "./api";

export const topicService = {
    getAll() {
        return api.get("/topics");
    },

    getById(id) {
        return api.get(`/topics/${id}`);
    },

    create(data, token) {
        return api.post("/topics", data, token);
    },

    update(id, data, token) {
        return api.put(`/topics/${id}`, data, token);
    },

    delete(id, token) {
        return api.delete(`/topics/${id}`, token);
    },
};