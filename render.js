export function renderSearchResults(searchResult) {
   const main = document.querySelector("#main-content");
   main.innerHTML = "";

   const resultsCount = document.createElement("h3");
   resultsCount.textContent = `${searchResult.length} result${searchResult.length !== 1 ? "s" : ""} found`;
   resultsCount.style.marginBottom = "1rem";
   main.appendChild(resultsCount);

   if (searchResult.length === 0) return;

   searchResult.forEach((show) => {
      const { image, name, premiered, genres, rating, type } = show;

      const card = document.createElement("article");
      card.className = "show-card";

      const img = document.createElement("img");
      img.src = image?.medium || image?.original || "./assets/no-image-placeholder.png";
      img.alt = `${name} poster`;
      card.appendChild(img);

      const details = document.createElement("section");
      details.className = "card-details";

      const header = document.createElement("section");
      header.className = "card-header";

      const title = document.createElement("h2");
      title.textContent = `${name || "Unknown Show"} (${premiered ? premiered.slice(0, 4) : "N/A"})`;

      const genre = document.createElement("p");
      genre.innerHTML = `<span>🧭</span> Genre: ${genres?.join(", ") || "N/A"}`;

      const ratingEl = document.createElement("p");
      ratingEl.innerHTML = `<span>⭐</span> Rating: ${rating?.average || "N/A"}`;

      const typeEl = document.createElement("p");
      typeEl.innerHTML = `<span>🏷️</span> Type: ${type || "N/A"}`;

      header.append(title, genre, ratingEl, typeEl);

      const buttons = document.createElement("section");
      buttons.className = "card-buttons";

      const watchBtn = document.createElement("button");
      watchBtn.className = "watch-later-btn";
      watchBtn.title = "🕒 Watch Later";
      watchBtn.textContent = "🕒 Watch Later";

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn-no";
      favBtn.title = "🤍 Favorite";
      favBtn.textContent = "🤍 Favorite";

      buttons.append(watchBtn, favBtn);

      details.append(header, buttons);
      card.append(details);
      main.append(card);
   });
}
