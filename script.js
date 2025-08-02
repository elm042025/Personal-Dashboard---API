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
      .map((show) => {
         const { image, name, premiered, genres, rating, type } = show;
         return `
            <article class="show-card">
            <img
            src="${
               image
                  ? image.medium || image.original
                  : "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg"
            }"
            alt="${show.name} poster"
            />
               <section class="card-details">
                    <section class="card-header">
                        <h2>${name} (${premiered ? premiered.slice(0, 4) : "N/A"})</h2>
                        <p><span>🧭</span> Genre: ${genres ? genres.join(", ") : "N/A"}</p>
                        <p><span>⭐</span> Rating: ${rating.average ? rating.average : "N/A"}</p>
                        <p><span>🏷️</span> Type: ${type ? type : "N/A"}</p>
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
   `;
      })
      .join("");
}

// !---------- Search Input Keydown Event ----------  */
