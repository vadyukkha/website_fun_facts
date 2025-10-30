import"./style-CNVNne70.js";document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("loadImage"),e=document.getElementById("image-container");o.addEventListener("click",t);async function t(){try{e.innerHTML="<p>Загрузка...</p>";const n=await fetch("https://random.dog/woof.json?include=jpg");if(!n.ok)throw new Error("Ошибка загрузки изображения");const a=await n.json();r(a)}catch(n){e.innerHTML=`<p class="error">Ошибка: ${n.message}</p>`}}function r(n){if(!n.url){e.innerHTML="<p>Изображение не найдено</p>";return}e.innerHTML=`
            <div class="image-card">
                <img src="${n.url}" alt="Случайная собака" onerror="this.style.display='none'">
            </div>
        `}t()});
