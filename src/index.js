import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


function updateBreedSelect(breeds) {
  breedSelect.innerHTML = "";
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}


function updateCatInfo(catData) {
  const cat = catData[0]; 
  catInfo.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" />
  `;
}


breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  

  catInfo.style.display = "none";
  loader.style.display = "block";

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {

      updateCatInfo(catData);
      loader.style.display = "none";
      catInfo.style.display = "block";
    })
    .catch((error) => {

      error.style.display = "block";
      loader.style.display = "none";
    });
});


fetchBreeds()
  .then((breeds) => {
    updateBreedSelect(breeds);
  })
  .catch((error) => {

    error.style.display = "block";
  });