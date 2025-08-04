export function renderSearchResults(searchResult) {
   const main = document.querySelector("#main-content");
   main.innerHTML = "";

   const resultsCount = document.createElement("h3");
   resultsCount.textContent = `${searchResult.length} result${searchResult.length !== 1 ? "s" : ""} found`;
   resultsCount.style.marginBottom = "1rem";
   main.appendChild(resultsCount);

   if (searchResult.length === 0) return;

   searchResult.forEach((show) => {
      const { image, name, premiered, genres, rating, type, id, ...rest } = show;

      const watchLaterShows = JSON.parse(localStorage.getItem("watchLaterShows")) || [];
      const isSavedWatchLater = watchLaterShows.includes(name);
      const favoriteShows = JSON.parse(localStorage.getItem("favoriteShows")) || [];
      const isFavorited = favoriteShows.includes(name);

      const card = document.createElement("article");
      card.className = "show-card";
      card.id = id;

      const img = document.createElement("img");
      img.src = image?.medium || image?.original || "./assets/no-image-placeholder.png";
      img.alt = image ? `${name} poster` : "No image available";
      card.appendChild(img);

      const details = document.createElement("section");
      details.className = "card-details";

      const header = document.createElement("section");
      header.className = "card-header";

      const title = document.createElement("h2");
      title.textContent = `${name || "Unknown Show"}`; // `(${premiered ? premiered.slice(0, 4) : "N/A"})`;

      const premieredYear = document.createElement("span");
      premieredYear.textContent = ` (${premiered ? premiered.slice(0, 4) : "N/A"})`;

      const genre = document.createElement("p");
      genre.innerHTML = `<span>🧭</span> Genre: ${genres?.join(", ") || "N/A"}`;

      const ratingEl = document.createElement("p");
      ratingEl.innerHTML = `<span>⭐</span> Rating: ${rating?.average || "N/A"}`;

      const typeEl = document.createElement("p");
      typeEl.innerHTML = `<span>🏷️</span> Type: ${type || "N/A"}`;

      header.append(title, premieredYear, genre, ratingEl, typeEl);

      const buttons = document.createElement("section");
      buttons.className = "card-buttons";

      const watchBtn = document.createElement("button");

      if (isSavedWatchLater) {
         watchBtn.className = "watch-later-btn-added";
         watchBtn.textContent = "✔️ Added to Watch Later";
         watchBtn.title = "🕒 Remove from Watch Later List";
      } else {
         watchBtn.className = "watch-later-btn";
         watchBtn.textContent = "🕒 Watch Later";
         watchBtn.title = "🕒 Watch Later";
      }

      const favBtn = document.createElement("button");
      if (isFavorited) {
         favBtn.className = "fav-btn-yes";
         favBtn.textContent = "❤️ Favorited";
         favBtn.title = "❤️ Remove from Favorites";
      } else {
         favBtn.className = "fav-btn-no";
         favBtn.textContent = "🤍 Favorite";
         favBtn.title = "🤍 Add to Favorites";
      }

      buttons.append(watchBtn, favBtn);

      details.append(header, buttons);
      card.append(details);
      main.append(card);
   });
}
