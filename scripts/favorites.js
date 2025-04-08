function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    const container = document.getElementById("favorites-list");
    container.innerHTML = "";
  
    if (favorites.length === 0) {
      container.innerHTML = `
        <div class="card">
          <img src="https://res.cloudinary.com/dmimages/image/upload/v1705048340/sad_e72dxj.png" alt="No games" />
          <div class="card-content">
            <h3>No games added yet</h3>
          </div>
        </div>
      `;
      return;
    }
  
    favorites.forEach(game => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${game.image}" alt="${game.name}" />
        <div class="card-content">
          <h3>${game.name}</h3>
          <button onclick="deleteFavorite(${game.id})">Delete</button>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  function deleteFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    let ids = JSON.parse(localStorage.getItem("gamesId")) || [];
  
    const index = favorites.findIndex(game => game.id === id);
    if (index !== -1) {
      favorites.splice(index, 1);
      ids.splice(index, 1);
      localStorage.setItem("favoriteGames", JSON.stringify(favorites));
      localStorage.setItem("gamesId", JSON.stringify(ids));
      alert("Game deleted from favorites.");
      loadFavorites();
    }
  }
  
  loadFavorites();
  