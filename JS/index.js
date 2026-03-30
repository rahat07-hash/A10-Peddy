console.log("object");


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

// Fetch , Load , Show category

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
}


// Fetch , Load , Show All Pets

const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
}

const displayPets = (pets) => {
    const petsContainer = document.getElementById("showPets")
    pets.forEach((pet) => {
        console.log(pet)


        //         {
        // "petId": 2,
        // "breed": "Siamese",
        // "category": "Cat",
        // "date_of_birth": "2022-09-05",
        // "price": 800,
        // "image": "https://i.ibb.co.com/3Wzz41D/pet-2.jpg",
        // "gender": "Female",
        // "pet_details": "This affectionate female Siamese cat is known for her vocal nature and love for attention. Born on September 5, 2022, she enjoys interactive play and snuggles. Fully vaccinated and priced at $800, she's the perfect fit for cat lovers who appreciate an intelligent, engaging, and sociable feline companion.",
        // "vaccinated_status": "Fully",
        // "pet_name": "Mia"
        // },

        const petCard = document.createElement("div")
        petCard.innerHTML = "";

        petCard.innerHTML = `

        <div  class="bg-white border border-gray-500 rounded-xl p-4">

                        <img src="${pet?.image}" class="w-full h-[160px] object-cover rounded-lg mb-3" />

                        <h3 class="font-semibold text-gray-800 text-sm">${pet.pet_name}</h3>

                        <div class="text-xs text-gray-500 mt-2 space-y-1">
                            <p> 🐾 Breed: ${pet.breed ?? "Not Available"}</p>
                            <p> 📅 Birth: ${pet.date_of_birth ?? "Not Available"}</p>
                            <p> ⚥ Gender: ${pet.gender ?? "Not Available"}</p>
                            <p> 💲 Price: ${pet.price != null ? `${pet.price}$` : "Not Available"}</p>
                        </div>

                        <div class="flex items-center gap-2 mt-4">
                        
                             <button onclick="likePet('${pet.image}')" class=" cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    <img class="w-5" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="">
                             </button>

                            <button class=" btn flex-1 text-xs py-2 bg-teal-500 text-white rounded-md">
                                Adopt
                            </button>
                            <button class="btn flex-1 text-xs py-2 border rounded-md text-gray-600">
                                Details
                            </button>
                        </div>

                    </div>

        `

        petsContainer.append(petCard)
    })
}

const likePet = (img) => {
    const container = document.getElementById("likedPets");

    const image = document.createElement("img");
    image.src = img;
    image.classList = "rounded-md w-full h-[70px] object-cover";

    container.appendChild(image);
}


const displayCategories = (pets) => {

    const petContainer = document.getElementById("petsCategory");


    pets.forEach((item) => {
        console.log(item.category)

        // create buttons
        const button = document.createElement("button");
        button.classList = "";
        button.innerHTML = `
            <button class="flex items-center gap-3 px-6 py-3 border border-slate-100 rounded-xl bg-white shadow-sm font-bold text-slate-800">
  <img src="${item.category_icon}" alt="Dog" class="w-8 h-8">
  <span>${item.category}</span>
</button>
        `

        // add button to category
        petContainer.append(button);
    });


}



// Load Call
loadCategories()
loadPets()