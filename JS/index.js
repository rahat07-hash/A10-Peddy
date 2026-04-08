
// Fetch & Load All Category
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
}

// Fetch, Load, and Show All Pets with Loading Spinner
const loadPets = () => {
    const petsContainer = document.getElementById("showPets");

    // ১. ডাটা লোড হওয়ার আগে স্পিনার দেখানো
    petsContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-20">
            <span class="loading loading-ring loading-xl text-teal-500"></span>
        </div>
    `;

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            // ২. ডাটা আসা মাত্রই displayPets ফাংশন কল হবে (কোনো ফিক্সড টাইম নেই)
            displayPets(data.pets);
        })
        .catch((error) => {
            console.log(error);
            // ৩. যদি কোনো কারণে ডাটা লোড না হয় বা এরর আসে
            petsContainer.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <p class="text-red-500 font-bold">Something went wrong! Please try again later.</p>
                </div>
            `;
        });
}


// Display Pets Function (আগের মতোই থাকবে, শুধু innerHTML পরিষ্কার করবে)
const displayPets = (pets) => {
    const petsContainer = document.getElementById("showPets");

    // ৪. স্পিনার সরিয়ে কন্টেইনার খালি করা
    petsContainer.innerHTML = "";

    // ৫. যদি ডাটা খালি থাকে (Empty Array)
    if (pets.length === 0) {
        petsContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center items-center py-20 bg-gray-50 rounded-3xl">
                <img src="./images/error.webp" />
                <h2 class="text-2xl font-bold mt-4">No Information Available</h2>
                <p class=" text-center w-9/12 mt-5 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking
            at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
        `;
        return;
    }

    // ৬. ডাটা থাকলে কার্ড তৈরি করা
    pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.innerHTML = `
            <div class="bg-white border border-gray-300 rounded-xl shadow p-4">
                <img src="${pet?.image}" class="w-full h-[160px] object-cover rounded-lg mb-3" />
                <h3 class="font-semibold text-gray-800 text-sm">${pet.pet_name}</h3>
                <div class="text-xs text-gray-500 mt-2 space-y-1">
                    <p> 🐾 Breed: ${pet.breed ?? "Not Available"}</p>
                    <p> 📅 Birth: ${pet.date_of_birth ?? "Not Available"}</p>
                    <p> ⚥ Gender: ${pet.gender ?? "Not Available"}</p>
                    <p> 💲 Price: ${pet.price != null ? `${pet.price}$` : "Not Available"}</p>
                </div>
                <div class="flex items-center gap-2 mt-4">
                    <button onclick="likePet('${pet.image}')" class="cursor-pointer bg-white hover:bg-gray-100 p-2 border border-gray-300 rounded shadow">
                        <img class="w-5" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="">
                    </button>
                    <button class="btn flex-1 text-xs py-2 bg-teal-500 text-white rounded-md">Adopt</button>
                    <button onclick = "loadPetDetails('${pet.petId}')" class="btn flex-1 text-xs py-2 border rounded-md text-gray-600">Details</button>
                </div>
            </div>
        `;
        petsContainer.append(petCard);
    });
}


// Licked Pets
const likePet = (img) => {
    const container = document.getElementById("likedPets");

    const image = document.createElement("img");
    image.src = img;
    image.classList = "rounded-md w-full h-[70px] object-cover";

    container.appendChild(image);
}

// Remove class Function

const removeClass = () =>{

    const buttons = document.getElementsByClassName("btn-category")
    for(let btn of buttons){
        btn.classList.remove("active")
    }

}


const loadCategoryPets = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const activeButton = document.getElementById(`btn-${id}`);
            removeClass()
            activeButton.classList.add("active");
            displayPets(data.data);
        })
        .catch((error) => console.log(error));
}
// Load Pet details

const loadPetDetails = async (petId) => {
    const url = (`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const res = await fetch(url)
    const data = await res.json()
    detailsModalshow(data.petData)

}


const detailsModalshow = (pet) => {

    const modalContent = document.getElementById("modalContent")
    modalContent.innerHTML = `
    

     <div class="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100">
      <div class="w-full h-64 overflow-hidden">
        <img 
          src="${pet.image}" 
          alt="${pet.pet_name}" 
          class="w-full h-full object-cover"
        />
      </div>

      <div class="p-6 text-left">
        <h2 class="text-2xl font-extrabold text-gray-900 mb-4">${pet.pet_name}</h2>
        
        <div class="grid grid-cols-2 gap-y-3 mb-6 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <span class="opacity-70">📁</span> 
            <span class="font-semibold">Breed:</span> ${pet.breed}
          </div>
          <div class="flex items-center gap-2">
            <span class="opacity-70">📅</span> 
            <span class="font-semibold">Birth:</span> ${new Date(pet.date_of_birth).getFullYear()}
          </div>
          <div class="flex items-center gap-2">
            <span class="opacity-70">♀️</span> 
            <span class="font-semibold">Gender:</span> ${pet.gender}
          </div>
          <div class="flex items-center gap-2">
            <span class="opacity-70">💰</span> 
            <span class="font-semibold">Price:</span> ${pet.price}$
          </div>
          <div class="flex items-center gap-2 col-span-2">
            <span class="opacity-70">💉</span> 
            <span class="font-semibold">Vaccinated status:</span> ${pet.vaccinated_status}
          </div>
        </div>

        <hr class="border-gray-100 mb-5" />

        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-800 mb-2">Details Information</h3>
          <p class="text-gray-500 leading-relaxed text-sm">
            ${pet.pet_details}
          </p>
        </div>
      </div>
    </div>
    
    
    `
  

    document.getElementById("petDetailsModal").showModal()
}
// Display Category Buttons
const displayCategories = (pets) => {

    const petContainer = document.getElementById("petsCategory");

    pets.forEach((item) => {
        // create buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList = "";
        buttonContainer.innerHTML = `
            <button id="btn-${item.category}" onclick = "loadCategoryPets('${item.category}')" class=" btn-category flex cursor-pointer items-center gap-3 px-6 py-3 border border-slate-100 rounded-xl bg-white shadow-sm font-bold text-slate-800">
                    <img src="${item.category_icon}" alt="Dog" class="w-8 h-8">
                    <span>${item.category}</span>
            </button>
        `

        // add button to category
        petContainer.append(buttonContainer);
    });


}




// Load Call
loadCategories()
loadPets()



// {
// "petId": 1,
// "breed": "Golden Retriever",
// "category": "Dog",
// "date_of_birth": "2023-01-15",
// "price": 1200,
// "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
// "gender": "Male",
// "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
// "vaccinated_status": "Fully",
// "pet_name": "Sunny"
// },
