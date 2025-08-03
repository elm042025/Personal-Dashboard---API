import { fetchSearchResults } from "./apiFetch.js";
import { renderSearchResults } from "./render.js";

const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const main = document.querySelector("#main-content");
const watchLaterShows = JSON.parse(localStorage.getItem("watchLaterShows")) || [];

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

// push  show to local storage when watch later button is clicked

main.addEventListener("click", function (e) {
   if (e.target.classList.contains("watch-later-btn") || e.target.classList.contains("watch-later-btn-added")) {
      const watchLaterShow = localStorage.getItem("watchLaterShows") ? JSON.parse(localStorage.getItem("watchLaterShows")) : [];

      const showName = e.target.closest(".card-details").querySelector("h2").textContent;

      if (!watchLaterShows.includes(showName)) {
         watchLaterShows.push(showName);
         localStorage.setItem("watchLaterShows", JSON.stringify(watchLaterShows));
         e.target.classList.remove("watch-later-btn");
         e.target.classList.add("watch-later-btn-added");
         e.target.textContent = "✔️ Added to Watch Later";
         e.target.title = "🕒 Added to Watch Later List";
      } else {
         const index = watchLaterShows.indexOf(showName);
         if (index > -1) {
            watchLaterShows.splice(index, 1);
            localStorage.setItem("watchLaterShows", JSON.stringify(watchLaterShows));
            e.target.classList.remove("watch-later-btn-added");
            e.target.classList.add("watch-later-btn");
            e.target.textContent = "🕒 Watch Later";
            e.target.title = "🕒 Add to Watch Later List";
         }
      }
   }
});
