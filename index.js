import { createCharacterCard } from "./components/card/card.js";
// import { maxPageCount } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
const searchQuery = "";

searchBarContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchEntry = new FormData(event.target);
  const characterSearch = Object.fromEntries(searchEntry);
  console.log(characterSearch.query);
  searchQuery = characterSearch;
});

nextButton.addEventListener("click", () => {
  page++;
  if (page > 42) {
    page = 42;
    return;
  }
  pagination.textContent = `${page} / ${maxPage}`;
  cardContainer.innerHTML = "";
  fetchCharacters(page);
});

prevButton.addEventListener("click", () => {
  page--;
  if (page < 1) {
    page = 1;
    return;
  }
  pagination.textContent = `${page} / ${maxPage}`;
  cardContainer.innerHTML = "";
  fetchCharacters(page);
});

async function fetchCharacters(value) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${value}&name=${searchQuery}`
    );
    const data = await response.json();
    const characterData = data.results;
    characterData.forEach((character) => {
      const names = character.name;
      const src = character.image;
      const alive = character.status;
      const alien = character.type;
      const howOften = character.episode.length;
      cardContainer.append(
        createCharacterCard(src, names, alive, alien, howOften)
      );
    });
  } catch {
    alert("Morty died");
  }
}

pagination.textContent = `${page} / ${maxPage}`;
fetchCharacters();
