import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Funkcja do aktualizacji select.breed-select
function updateBreedSelect(breeds) {
  breedSelect.innerHTML = "";
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Funkcja do aktualizacji catInfo
function updateCatInfo(catData) {
  const cat = catData[0]; // Pobieramy pierwszego kota z wyniku
  catInfo.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" />
  `;
}

// Obsługa zmiany wybranej rasy
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  
  // Ukrywamy catInfo i pokazujemy loader podczas pobierania informacji o kocie
  catInfo.style.display = "none";
  loader.style.display = "block";

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      // Po pobraniu informacji o kocie aktualizujemy catInfo i ukrywamy loader
      updateCatInfo(catData);
      loader.style.display = "none";
      catInfo.style.display = "block";
    })
    .catch((error) => {
      // W przypadku błędu wyświetlamy komunikat błędu i ukrywamy loader
      error.style.display = "block";
      loader.style.display = "none";
    });
});

// Inicjalizacja - pobieramy i wypełniamy select.breed-select
fetchBreeds()
  .then((breeds) => {
    updateBreedSelect(breeds);
  })
  .catch((error) => {
    // W przypadku błędu wyświetlamy komunikat błędu
    error.style.display = "block";
  });