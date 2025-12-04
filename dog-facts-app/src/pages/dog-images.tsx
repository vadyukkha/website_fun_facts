import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { DogImageData } from "../types/dog_image";

const DogImageWidget: React.FC = () => {
    const [image, setImage] = useState<DogImageData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDogImage = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("https://random.dog/woof.json?include=jpg");

            if (!response.ok) {
                throw new Error("Ошибка загрузки изображения");
            }

            const data: DogImageData = await response.json();
            setImage(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDogImage();

        const btn = document.getElementById("loadImage");
        if (btn) {
            btn.addEventListener("click", loadDogImage);
        }
        return () => {
            if (btn) btn.removeEventListener("click", loadDogImage);
        };
    }, []);

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p className="error">Ошибка: {error}</p>}

            {image?.url ? (
                <div className="image-card">
                    <img
                        src={image.url}
                        alt="Случайная собака"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                </div>
            ) : (
                !loading && <p>Изображение не найдено</p>
            )}
        </>
    );
};

const container = document.getElementById("image-container");
if (container) {
    ReactDOM.createRoot(container).render(<DogImageWidget />);
}
