import { fetchSearchResults } from "./apiFetch.js";
import { renderSearchResults } from "./render.js";
import { handleWatchLaterToggle } from "./localStorage.js";
import { handleFavoriteToggle } from "./localStorage.js";

const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const main = document.querySelector("#main-content");
const watchLaterListBtn = document.querySelector("#watch-later");
const watchLaterShows = JSON.parse(localStorage.getItem("watchLaterShows")) || [];
const favoriteShows = JSON.parse(localStorage.getItem("favoriteShows")) || [];
//!
searchBtn.addEventListener("click", async function (event) {
   event.preventDefault();

   const query = searchInput.value.trim();
   if (!query) return;

   try {
      const searchResult = await fetchSearchResults(query);
      renderSearchResults(searchResult);
   } catch (error) {
      alert("Error fetching search results: " + error);
   }
});

//! push or removes shows to/from local storage when the watch later button is clicked

main.addEventListener("click", handleWatchLaterToggle);

//! push or removes shows to/from local storage when the favorite button is clicked

main.addEventListener("click", handleFavoriteToggle);
