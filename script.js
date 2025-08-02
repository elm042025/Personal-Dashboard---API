const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const main = document.querySelector("#main-content");

//! ---------- Search Button Click Event / api fetch fn ----------  */

searchBtn.addEventListener("click", async function (event) {
   event.preventDefault();

   const query = searchInput.value.trim();

   if (query !== "") {
      const url = `https://api.tvmaze.com/search/shows?q=${query}`;

      try {
         const response = await fetch(url);
         const data = await response.json();
         const searchResult = data.map((item) => item.show);
         console.log(searchResult);
         renderSearchResults(searchResult);
         return searchResult;
      } catch (error) {
         alert("Error fetching search results: " + error);
      }
   }
});

//! ---------- Render page with search results ----------  */
function renderSearchResults(searchResult) {
   main.innerHTML = ""; // Clear previous content

   if (searchResult.length === 0) {
      main.innerHTML = "<p>No results found.</p>";
      return;
   }

   main.innerHTML = searchResult
      .map(
         (show) => `
            <article class="show-card">
            <img
            src="${
               show.image
                  ? show.image.medium || show.image.original
                  : "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg"
            }"
            alt="${show.name} poster"
            />
               <section class="card-details">
                    <section class="card-header">
                        <h2>${show.name} (${show.premiered})</h2>
                        <p>🧭 Genre: ${show.genres.join(", ")}</p>
                        <p>⭐ Rating: ${show.rating.average}</p>
                        <p>🏷️ Type: ${show.type}</p>
                    </section>
                    <section class="card-buttons">
                        <button
                            class="watch-later-btn"
                            title="🕒 Watch Later"
                        >
                            🕒 Watch Later
                        </button>
                        <button
                            class="fav-btn-no"
                            title="❤️ Favorite"
                        >
                            ❤️ Favorite
                        </button>
                    </section>
               </section>
            </article>
   `
      )
      .join("");
}

// !---------- Search Input Keydown Event ----------  */
