export async function fetchSearchResults(query) {
   const url = `https://api.tvmaze.com/search/shows?q=${query}`;
   const response = await fetch(url);
   if (!response.ok) throw new Error("Network response was not ok, " + response.statusText);
   const data = await response.json();
   return data.map((item) => item.show);
}
