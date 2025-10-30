import"./style-CNVNne70.js";document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("loadFacts"),n=document.getElementById("facts-container");o.addEventListener("click",a);async function a(){try{n.innerHTML="<p>Загрузка...</p>";const t=await fetch("https://dogapi.dog/api/v2/facts");if(!t.ok)throw new Error("Ошибка загрузки фактов");const e=await t.json();c(e.data)}catch(t){n.innerHTML=`<p class="error">Ошибка: ${t.message}</p>`}}function c(t){if(!t||t.length===0){n.innerHTML="<p>Факты не найдены</p>";return}const e=t.map(r=>`
            <div class="fact-card">
                <p>${r.attributes.body}</p>
            </div>
        `).join("");n.innerHTML=e}a()});
