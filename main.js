import { fetchSearchResults } from "./apiFetch.js";
import { renderSearchResults } from "./render.js";

const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");

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
