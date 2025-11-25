import { useState, useContext } from "react";
import { topicService } from "../services/topicService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateTopic() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Попълнете всички полета");
            return;
        }

        await topicService.create(
            { title, content, ownerId: user.email },
            user.accessToken
        );

        navigate("/catalog");
    };

    return (
        <section>
            <h1>Създай тема</h1>

            <form onSubmit={onSubmit}>
                <label>Заглавие</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Съдържание</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">Създай</button>
            </form>
        </section>
    );
}