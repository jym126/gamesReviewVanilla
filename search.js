const API_KEY = "0f37c1fbe7294b1fa22d0a8742173d98";
const BASE_URL = "https://api.rawg.io/api/games";

document.getElementById("search-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;

  const res = await fetch(`${BASE_URL}?key=${API_KEY}&search=${encodeURIComponent(query)}`);
  const data = await res.json();
  renderResults(data.results);
});

function renderResults(games) {
  const container = document.getElementById("search-results");
  container.innerHTML = "";

  if (games.length === 0) {
    container.innerHTML = "<p>No games found.</p>";
    return;
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" />
      <div class="card-content">
        <h3>${game.name}</h3>
        <p>Rating: ${game.rating}</p>
        <button onclick='addToFavorites(${JSON.stringify(game)})'>Add to Favorites</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToFavorites(game) {
  let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
  let ids = JSON.parse(localStorage.getItem("gamesId")) || [];

  if (!ids.includes(game.id)) {
    favorites.push({ id: game.id, name: game.name, image: game.background_image });
    ids.push(game.id);
    localStorage.setItem("favoriteGames", JSON.stringify(favorites));
    localStorage.setItem("gamesId", JSON.stringify(ids));
    alert("Game added to favorites!");
  } else {
    alert("Game already in favorites.");
  }
}
