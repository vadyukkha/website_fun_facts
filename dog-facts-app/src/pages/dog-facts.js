document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.getElementById('loadFacts');
    const container = document.getElementById('facts-container');

    loadButton.addEventListener('click', loadDogFacts);

    async function loadDogFacts() {
        try {
            container.innerHTML = '<p>Загрузка...</p>';
            
            const response = await fetch('https://dogapi.dog/api/v2/facts');
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки фактов');
            }
            
            const data = await response.json();
            displayFacts(data.data);
            
        } catch (error) {
            container.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        }
    }

    function displayFacts(facts) {
        if (!facts || facts.length === 0) {
            container.innerHTML = '<p>Факты не найдены</p>';
            return;
        }

        const factsHTML = facts.map(fact => `
            <div class="fact-card">
                <p>${fact.attributes.body}</p>
            </div>
        `).join('');

        container.innerHTML = factsHTML;
    }

    loadDogFacts();
});
