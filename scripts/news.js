import { apiUrl } from "./env.js"; // Asegúrate que la ruta sea correcta según tu estructura

window.onload = async function () {
  const games = await fetchGames();
  renderGames(games);
};

async function fetchGames() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

function renderGames(games) {
  const container = document.getElementById("game-list");
  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" />
      <div class="card-content">
        <h3>${game.name}</h3>
        <p>Rating: ${game.rating}</p>
        <button class="add-fav-btn">Add to Favorites</button>
      </div>
    `;

    // Evento para abrir el modal al hacer click en la tarjeta
    card.addEventListener("click", () => openModal(game));

    // Evento para agregar a favoritos solo si se hace click en el botón
    const button = card.querySelector(".add-fav-btn");
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // evita que se dispare el evento del card
      addToFavorites(game);
    });

    container.appendChild(card);
  });
}

function addToFavorites(game) {
  let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
  let ids = JSON.parse(localStorage.getItem("gamesId")) || [];

  if (!ids.includes(game.id)) {
    favorites.push({
      id: game.id,
      name: game.name,
      image: game.background_image
    });
    ids.push(game.id);
    localStorage.setItem("favoriteGames", JSON.stringify(favorites));
    localStorage.setItem("gamesId", JSON.stringify(ids));
    alert("Added to favorites!");
  } else {
    alert("Game already in favorites!");
  }
}

// ----------- Modal Functions -----------

function openModal(game) {
  const modal = document.getElementById("gameModal");
  const details = document.getElementById("modal-details");

  details.innerHTML = `
    <img src="${game.background_image}" alt="${game.name}">
    <h2>${game.name}</h2>
    <p><strong>Rating:</strong> ${game.rating}</p>
    <p><strong>Released:</strong> ${game.released}</p>
    <p><strong>Genres:</strong> ${game.genres?.map(g => g.name).join(", ") || "N/A"}</p>
    <p><strong>Features:</strong> ${game.tags?.map(d => d.name).join(", ") || "N/A"}</p>
  `;

  modal.classList.remove("hidden");

  // Prevenir cierre al hacer click dentro del modal
  document.querySelector("#modalContent").addEventListener("click", e => e.stopPropagation());
}

function closeModal() {
  document.getElementById("gameModal").classList.add("hidden");
}

// Agregar función al window para que funcione desde el HTML
window.closeModal = closeModal;

// Cerrar modal al hacer click fuera del contenido
document.getElementById("gameModal").addEventListener("click", closeModal);
