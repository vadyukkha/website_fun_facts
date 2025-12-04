import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

export const AppInitLogger: React.FC = () => {
    console.log("Добро пожаловать в приложение Факты и Картинки!");

    useEffect(() => {
        console.log("Страница загружена!");
    }, []);

    return null;
};

ReactDOM.createRoot(document.body.appendChild(document.createElement("div"))).render(<AppInitLogger />);
