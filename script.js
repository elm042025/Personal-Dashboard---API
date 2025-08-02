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

//! ---------- Render page with search results using innerHTML (test) ---------- //
/*
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
} */

//! ---------- Render page with search results (optimized, safe from injection) ---------- //

function renderSearchResults(searchResult) {
   main.innerHTML = ""; // Clear previous content

   const resultsCount = document.createElement("h3");
   resultsCount.textContent = `${searchResult.length} result${searchResult.length !== 1 ? "s" : ""} found`;
   resultsCount.style.marginBottom = "1rem";
   main.appendChild(resultsCount);

   if (searchResult.length === 0) {
      //   const message = document.createElement("p");
      //   message.textContent = "No results found.";
      //   main.appendChild(message);
      return;
   }

   searchResult.forEach((show) => {
      const { image, name, premiered, genres, rating, type } = show;

      // Create card
      const card = document.createElement("article");
      card.className = "show-card";

      // Poster image
      const img = document.createElement("img");
      img.src =
         image?.medium ||
         image?.original ||
         "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg";
      img.alt = `${name} poster`;
      card.appendChild(img);

      // Card details
      const details = document.createElement("section");
      details.className = "card-details";

      // Header info
      const header = document.createElement("section");
      header.className = "card-header";

      const title = document.createElement("h2");
      title.textContent = `${name} (${premiered ? premiered.slice(0, 4) : "N/A"})`;

      const genre = document.createElement("p");
      genre.innerHTML = `<span>🧭</span> Genre: ${genres?.join(", ") || "N/A"}`;

      const ratingEl = document.createElement("p");
      ratingEl.innerHTML = `<span>⭐</span> Rating: ${rating?.average || "N/A"}`;

      const typeEl = document.createElement("p");
      typeEl.innerHTML = `<span>🏷️</span> Type: ${type || "N/A"}`;

      header.append(title, genre, ratingEl, typeEl);

      // Buttons
      const buttons = document.createElement("section");
      buttons.className = "card-buttons";

      const watchBtn = document.createElement("button");
      watchBtn.className = "watch-later-btn";
      watchBtn.title = "🕒 Watch Later";
      watchBtn.textContent = "🕒 Watch Later";

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn-no";
      favBtn.title = "❤️ Favorite";
      favBtn.textContent = "❤️ Favorite";

      buttons.append(watchBtn, favBtn);

      // Assemble card
      details.append(header, buttons);
      card.append(details);
      main.append(card);
   });
}

// !---------- Search Input Keydown Event ----------  */
