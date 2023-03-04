let count = 6;
// modal
const accuracyContainer = document.getElementById("accuracy-data")
function accuracyTagRemover () {
    document.getElementById("accuracy").remove();
    return "";
}
function accuracyAdder (score) {
    accuracyContainer.innerHTML = `<p class=" bg-[#EB5757] text-white p-2 rounded-md font-bold" id="accuracy">${score}</p>`;
}
// modal data load  && function load 
const showModal = async (id) => {    
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const modal = data.data;
    document.getElementById("my-modal-3").checked = true;
    document.getElementById("modal-img").src = `${modal.image_link[0]}`;
    document.getElementById("modal-description").innerText = `${modal.description}`;
    document.getElementById("modal-input").innerText = `${modal.input_output_examples ? modal.input_output_examples[0].input : "Can you give any example?"}`;
    document.getElementById("modal-output").innerText =`${modal.input_output_examples ? modal.input_output_examples[0].output: "No! Not Yet! Take a break" }`;
    `${modal.accuracy.score ?  accuracyAdder(modal.accuracy.score * 100 + "% accuracy") : accuracyTagRemover()}`;
    document.getElementById("price1").innerText = `${modal.pricing ? modal.pricing[0].price : "Free of cost"} Basic`;
    document.getElementById("price2").innerText =`${modal.pricing ? modal.pricing[1].price : "Free of cost"} Pro`;
    document.getElementById("price3").innerText = `${modal.pricing ? modal.pricing[2].price : "Free of cost"} Enterprise`;
    const features = document.getElementById("features-list");
    const integrations = document.getElementById("integrations");
    features.innerHTML = "";
    integrations.innerHTML = "";
    const featuresList = modal.features ? featureAdder(modal.features): featureAdder("");
    function featureAdder(featuresLists) { 
        try{
            for(let feature in featuresLists) {
                features.innerHTML += `<li class="py-1">${featuresLists[feature].feature_name}</li>`
            }
        } catch (err) {
            features.innerHTML = "No data found";
        }       
    }
    const integrationsList = modal.integrations ? integrationsAdder(modal.integrations) : integrationsAdder("");

    function integrationsAdder (integrationsLists) {
        try {
            integrationsLists.forEach(integration => {
                integrations.innerHTML += `<li class="py-1">${integration}</li>`
            })
        } catch(err) {
            integrations.innerText = "No data found";
        }        
    }    
}

// spinner and loading code here

const spinner = (isLoading) => {
  if(isLoading){
    document.getElementById('spinner').classList.remove('hidden');
  }
  else{
    document.getElementById('spinner').classList.add('hidden');
  }
}

const showData =  (tools) => {
  const cardDetails = document.getElementById('card-details');
  cardDetails.innerHTML = '';
    tools.forEach(tool => {
        cardDetails.innerHTML += `
        <article class="card w-96 bg-base-100 shadow-xl border p-5 rounded-xl">
                    <figure>
                        <img class="h-56 w-full rounded-xl" src="${tool.image}" alt="Shoes" />
                    </figure>
                    <div class="py-4">
                        <h2 class="card-title font-bold">
                            Features
                        </h2>
                        <ol class="list-[number] ml-4 mt-2">
                            <li>${tool.features[0] ? tool.features[0] : "Not Available"}</li>
                            <li>${tool.features[1] ? tool.features[1] : "Not Available"}</li>
                            <li>${tool.features[2] ? tool.features[2] : "Not Available"}</li>
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
                          <button onclick="showModal('${tool.id}')"> 
                          <i class="fa-solid fa-arrow-right-long"></i>
                          </button> 
                        </div> 
                    </div>
         </article>
         
    `;   
        

    })
}

const AiDataLoad = async () => {
  spinner(true)
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  const toolsData = data.data.tools;
  const tools = toolsData.slice(0, count);
  const sortByDate = () => {
    tools.sort(function(a, b){        
        return new Date(a.published_in) - new Date(b.published_in);
    });
}



// sort button code here 

const sortBtn = document.getElementById("sort-date-btn");
sortBtn.addEventListener("click", () => {
    sortByDate();
    showData(tools);
})
showData(tools);

// see more button 
  const seeMoreBtn = document.getElementById('see-more-btn');
  seeMoreBtn.onclick = () => {
    count = toolsData.length;
    AiDataLoad();
    seeMoreBtn.classList.add("hidden")
}

spinner(false)

}

AiDataLoad();