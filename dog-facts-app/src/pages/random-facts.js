document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.getElementById('loadRandomFact');
    const container = document.getElementById('fact-container');

    loadButton.addEventListener('click', loadRandomFact);

    async function loadRandomFact() {
        try {
            container.innerHTML = '<p>Загрузка...</p>';
            
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки факта');
            }
            
            const data = await response.json();
            displayFact(data);
            
        } catch (error) {
            container.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        }
    }

    function displayFact(factData) {
        if (!factData.text) {
            container.innerHTML = '<p>Факт не найден</p>';
            return;
        }

        container.innerHTML = `
            <div class="fact-card">
                <p>${factData.text}</p>
                ${factData.source ? `<p class="source">Источник: ${factData.source}</p>` : ''}
            </div>
        `;
    }

    loadRandomFact();
});