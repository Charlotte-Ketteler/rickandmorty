import { createCharacterCard } from "./components/card/card.js";
// import { maxPageCount } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
// const searchBarContainer = document.querySelector(
//   '[data-js="search-bar-container"]'
// );
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let searchQuery = "";
let maxPage = 0;
let page = 1;

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  const searchEntry = new FormData(event.target);
  const characterSearch = Object.fromEntries(searchEntry);
  searchQuery = characterSearch.query;
  console.log(searchQuery);
  maxPage = await fetchCharacters(0, searchQuery);
  pagination.textContent = ` 1 / ${maxPage}`;
  event.target.reset();
});

nextButton.addEventListener("click", async () => {
  page++;
  if (page > maxPage) {
    page = maxPage;
    return;
  }
  pagination.textContent = `${page} / ${maxPage}`;
  cardContainer.innerHTML = "";
  fetchCharacters(page, searchQuery);
});

prevButton.addEventListener("click", async () => {
  page--;
  if (page < 1) {
    page = 1;
    return;
  }
  pagination.textContent = `${page} / ${maxPage}`;
  cardContainer.innerHTML = "";
  await fetchCharacters(page, searchQuery);
});

async function fetchCharacters(value, search = "") {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${value}&name=${search}`
    );
    const data = await response.json();
    const characterData = data.results;
    characterData.forEach((character) => {
      const { name, image, status, type, episode } = character;
      cardContainer.append(
        createCharacterCard(image, name, status, type, episode.length)
      );
    });
    return data.info.pages;
  } catch (error) {
    alert("Morty died");
  }
}

maxPage = await fetchCharacters();
pagination.textContent = `${page} / ${maxPage}`;
