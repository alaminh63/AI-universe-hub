const loadAiData = async id => {
    loadingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiData(data.data.tools)
}
let cardCount = 6;
const displayAiData = tools => {
    let cardContainer = document.getElementById('card-container');
    tools = tools.slice(0, cardCount);
    for (const tool of tools) {
        const divContainer = document.createElement('div');
        divContainer.innerHTML = `

            <article class="card w-96 bg-base-100 shadow-xl border p-5 rounded-xl">
                        <figure>
                            <img class="h-56 w-full rounded-xl" src="${tool.image}" alt="Shoes" />
                        </figure>
                        <div class="py-4">
                            <h2 class="card-title font-bold">
                                Features
                            </h2>
                            <ol class="list-[number] ml-4 mt-2">
                                <li>${tool.features[0]}</li>
                                <li>${tool.features[1]}</li>
                                <li>${tool.features[2]}</li>
                            </ol>
                            <hr class="my-5">
                            <h2 class="text-xl font-bold">
                                ${tool.name} 
                            </h2>
                        </div>
                        <div class="flex justify-between item-center">
                            <div>
                                <i class="fa-solid fa-calendar-days"></i>
                                ${tool.published_in ? tool.published_in : "Not available"}
                            </div>    
                            <div>
                            <button>
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                            </div>
                        </div>
             </article>
             
        `;
        cardContainer.appendChild(divContainer);
        loadingSpinner(false);
    }
    
}

const loadingSpinner = isLoading => {
    if(isLoading){
        document.getElementById("spinner").classList.remove("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
    }
}
loadAiData();
