import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RandomFactData } from "../types/random_fact";

const RandomFactWidget: React.FC = () => {
    const [fact, setFact] = useState<RandomFactData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadRandomFact = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
            );

            if (!response.ok) {
                throw new Error("Ошибка загрузки факта");
            }

            const data: RandomFactData = await response.json();
            setFact(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRandomFact();

        const btn = document.getElementById("loadRandomFact");
        if (btn) btn.addEventListener("click", loadRandomFact);

        return () => {
            if (btn) btn.removeEventListener("click", loadRandomFact);
        };
    }, []);

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p className="error">Ошибка: {error}</p>}

            {fact ? (
                <div className="fact-card">
                    <p>{fact.text}</p>
                    {fact.source && <p className="source">Источник: {fact.source}</p>}
                </div>
            ) : (
                !loading && <p>Факт не найден</p>
            )}
        </>
    );
};

const container = document.getElementById("fact-container");
if (container) {
    ReactDOM.createRoot(container).render(<RandomFactWidget />);
}
