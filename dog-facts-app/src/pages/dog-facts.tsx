import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { DogFactData } from "../types/dog_fact";


const DogFactsWidget: React.FC = () => {
    const [facts, setFacts] = useState<DogFactData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDogFacts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("https://dogapi.dog/api/v2/facts");

            if (!response.ok) {
                throw new Error("Ошибка загрузки фактов");
            }

            const data = await response.json();
            setFacts(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDogFacts();

        const btn = document.getElementById("loadFacts");
        if (btn) btn.addEventListener("click", loadDogFacts);

        return () => {
            if (btn) btn.removeEventListener("click", loadDogFacts);
        };
    }, []);

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p className="error">Ошибка: {error}</p>}

            {facts.length === 0 && !loading && <p>Факты не найдены</p>}

            {facts.map((fact) => (
                <div key={fact.id} className="fact-card">
                    <p>{fact.attributes.body}</p>
                </div>
            ))}
        </>
    );
};

const container = document.getElementById("facts-container");
if (container) {
    ReactDOM.createRoot(container).render(<DogFactsWidget />);
}
