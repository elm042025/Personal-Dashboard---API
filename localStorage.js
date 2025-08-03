//! pushed or removes shows to/from local storage when the watch later button is clicked
//! This function is called in main.js and handles the logic for toggling the watch later status

export function handleWatchLaterToggle(e) {
   if (e.target.classList.contains("watch-later-btn") || e.target.classList.contains("watch-later-btn-added")) {
      const watchLaterShows = localStorage.getItem("watchLaterShows") ? JSON.parse(localStorage.getItem("watchLaterShows")) : [];

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
}

//! pushes or removes shows to/from local storage when the favorite button is clicked
//! This function is called in main.js and handles the logic for toggling the favorite status

export function handleFavoriteToggle(e) {
   if (e.target.classList.contains("fav-btn-no") || e.target.classList.contains("fav-btn-yes")) {
      const favoriteShows = localStorage.getItem("favoriteShows") ? JSON.parse(localStorage.getItem("favoriteShows")) : [];

      const showName = e.target.closest(".card-details").querySelector("h2").textContent;

      if (!favoriteShows.includes(showName)) {
         favoriteShows.push(showName);
         localStorage.setItem("favoriteShows", JSON.stringify(favoriteShows));
         e.target.classList.remove("fav-btn-no");
         e.target.classList.add("fav-btn-yes");
         e.target.textContent = "❤️ Favorited";
         e.target.title = "❤️ Remove from Favorites";
      } else {
         const index = favoriteShows.indexOf(showName);
         if (index > -1) {
            favoriteShows.splice(index, 1);
            localStorage.setItem("favoriteShows", JSON.stringify(favoriteShows));
            e.target.classList.remove("fav-btn-yes");
            e.target.classList.add("fav-btn-no");
            e.target.textContent = "🤍 Favorite";
            e.target.title = "🤍 Add to Favorites";
         }
      }
   }
}
