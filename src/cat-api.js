import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_JvQQOY886V6VrkLbswj6HjMkPQOYfIUB2zVjSf3iyqSSuZoA2mOGcmuOJTxbOdoN";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}