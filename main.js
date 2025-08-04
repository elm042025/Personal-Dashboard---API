import { fetchSearchResults } from "./apiFetch.js";
import { renderSearchResults } from "./render.js";
import { handleWatchLaterToggle } from "./localStorage.js";
import { handleFavoriteToggle } from "./localStorage.js";

const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const main = document.querySelector("#main-content");
const home = document.querySelector("#home");
const watchLaterListBtn = document.querySelector("#watch-later");
const favoriteListBtn = document.querySelector("#favorites");
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
//! Navigate to index.html when the home button is clicked
home.addEventListener("click", function () {
   window.location.href = "index.html";
});

//! push or removes shows to/from local storage when the watch later button is clicked

main.addEventListener("click", handleWatchLaterToggle);

//! push or removes shows to/from local storage when the favorite button is clicked

main.addEventListener("click", handleFavoriteToggle);

//! Render watch later shows from localStorage when the button is clicked
watchLaterListBtn.addEventListener("click", async function () {
   const savedNames = JSON.parse(localStorage.getItem("watchLaterShows")) || [];

   if (savedNames.length === 0) {
      main.innerHTML = "<h3>No shows in Watch Later list</h3>";
      return;
   }

   const fetchedShows = [];

   for (const name of savedNames) {
      try {
         const results = await fetchSearchResults(name);
         // Grab the first match (you could refine later)
         if (results.length > 0) {
            fetchedShows.push(results[0]);
         }
      } catch (err) {
         console.error(`Failed to fetch for ${name}:`, err);
      }
   }

   renderSearchResults(fetchedShows);
});

//! Render favorite shows from localStorage when the button is clicked
favoriteListBtn.addEventListener("click", async function () {
   const savedNames = JSON.parse(localStorage.getItem("favoriteShows")) || [];

   if (savedNames.length === 0) {
      main.innerHTML = "<h3>No shows in Favorites list</h3>";
      return;
   }

   const fetchedShows = [];

   for (const name of savedNames) {
      try {
         const results = await fetchSearchResults(name);
         // Grab the first match (you could refine later)
         if (results.length > 0) {
            fetchedShows.push(results[0]);
         }
      } catch (err) {
         console.error(`Failed to fetch for ${name}:`, err);
      }
   }

   renderSearchResults(fetchedShows);
});
