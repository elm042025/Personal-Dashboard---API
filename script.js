const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const main = document.querySelector("#main-content");

//! ---------- Search Button Click Event ----------  */

searchBtn.addEventListener("click", async function (event) {
   event.preventDefault();

   const query = searchInput.value.trim();
   if (query !== "") {
      const url = `https://api.tvmaze.com/search/shows?q=${query}`;
      try {
         const response = await fetch(url);
         const data = await response.json();
      } catch (error) {
         console.error("Error fetching search results:", error);
      }
   }
});

//! ---------- Render page with search results ----------  */

// !---------- Search Input Keydown Event ----------  */
