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

      const savedShows = JSON.parse(localStorage.getItem("watchLaterShows")) || [];
      const isSaved = savedShows.includes(name);

      const card = document.createElement("article");
      card.className = "show-card";
      card.id = id;

      const img = document.createElement("img");
      img.src = image?.medium || image?.original || "./assets/no-image-placeholder.png";
      img.alt = `${name} poster`;
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

      if (isSaved) {
         watchBtn.className = "watch-later-btn-added";
         watchBtn.textContent = "✔️ Added to Watch Later";
         watchBtn.title = "🕒 Remove from Watch Later List";
      } else {
         watchBtn.className = "watch-later-btn";
         watchBtn.textContent = "🕒 Watch Later";
         watchBtn.title = "🕒 Watch Later";
      }

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn-no";
      favBtn.dataset.id = `fav-btn-${id}`;
      favBtn.title = "🤍 Add to Favorites List";
      favBtn.textContent = "🤍 Favorite";

      buttons.append(watchBtn, favBtn);

      details.append(header, buttons);
      card.append(details);
      main.append(card);
   });
}
