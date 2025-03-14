//! Load function:

const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  data.categories.forEach((element) => {
    // console.log(element);
    showCategories(element);
  });
};

const loadPets = async (pet) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${pet}`
  );
  const data = await response.json();
  showPets(data.data);
};

const loadAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  console.log(data);
  showPets(data.pets);
};
//! show function
const showCategories = (cat = "") => {
  const btnCategories = document.getElementById("category-container");
  const category = document.createElement("button");
  category.id = `${cat.id}`;
  category.className =
    "btn py-6 px-14 button-cat rounded-md border-[#0E7A8115] bg-white overflow-hidden btn-xl";
  category.innerHTML = `<img class="w-6 mr-2 " src="${cat.category_icon}" alt="" /> ${cat.category}`;

  btnCategories.appendChild(category);
};

const showPets = (pet = "") => {
  document.getElementById("pet-container").innerHTML = ``;
  if (pet.length == 0) {
    document.getElementById("pet-container").innerHTML = ` <div
            class="w-full col-span-full h-96 flex flex-col justify-center items-center space-y-5"
          >
            <img src="./images/error.webp" alt="" />
            <h3 class="text-2xl font-bold italic text-[#13131380]">
              Oops! No pets available right now. Please check back later!
            </h3>
          </div>`;
    return;
  }
  pet.forEach((each) => {
    const btnCategories = document.getElementById("pet-container");
    const category = document.createElement("div");

    category.className = "card bg-base-100 shadow-sm";
    category.innerHTML = `
            <figure class="p-6">
              <img
                class="rounded-2xl"
                src=${each.image}
                alt=${each.category}
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                ${each.pet_name}
                <div class="badge badge-secondary">NEW</div>
              </h2>
              <ul class="text-[#13131370]">
                <li>
                  <i
                    class="fa-thin fa-diamonds-4 fa-rotate-by"
                    style="--fa-rotate-angle: 45deg"
                  ></i>
                  Breed: ${each.breed}
                </li>
                <li><i class="fa-light fa-calendar"></i> Birth: ${each.date_of_birth}</li>
                <li><i class="fa-light fa-venus-mars"></i> Gender: ${each.gender}</li>
                <li><i class="fa-light fa-square-dollar"></i> Price: ${each.price}$ </li>
              </ul>

              <hr class="border-1 border-gray-100" />
              <div class="card-actions justify-between">
                <button class="btn btn-square bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    class="size-[1.2em]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
                <button class="btn bg-white text-[#0E7A81]">Adopt</button>
                <button class="btn bg-white text-[#0E7A81]">Details</button>
              </div>
            </div>
          `;
    btnCategories.appendChild(category);
  });
};

//! eventListener
document
  .querySelector("#category-container")
  .addEventListener("click", (event) => {
    const button = event.target.closest(".button-cat"); // Ensure the button itself is selected
    if (button) {
      loadPets(button.innerText.trim()); // Pass category text (trimmed to remove extra spaces)

      // Reset background of all buttons before highlighting the clicked one
      document.querySelectorAll(".button-cat").forEach((btn) => {
        console.log(btn);
        btn.style.background = "";
        btn.style.border = "";
        btn.style.borderRadius = ""; // Reset to default
      });

      button.style.background = "#0E7A8110";
      button.style.border = "1px solid #0E7A81";
      button.style.borderRadius = "16px"; // Highlight the clicked button
    }
  });

document.getElementById("all-btn").addEventListener("click", (event) => {
  loadAllPets();
});

//! function call
loadCategories();
loadPets();
loadAllPets();
