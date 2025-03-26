const pokemonList = ['Pikachu', 'Charizard', 'Squirtle', 'Yoshi', 'Snorlax'];
const pokemonContainer = document.getElementById('pokemon-container');
const catchBtn = document.getElementById('catch-btn');
const messageDiv = document.getElementById('message');
const progressBar = document.getElementById('progress-bar');

let currentIndex = 0;

// Función para actualizar la barra de progreso
function updateProgress() {
    const progress = (currentIndex / pokemonList.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Función para reproducir sonido (opcional)
function playSound(pokemon) {
    const audio = new Audio(`sounds/${pokemon.toLowerCase()}.mp3`);
    audio.play().catch(e => console.log("Sonido no disponible"));
}

catchBtn.addEventListener('click', () => {
    if (currentIndex >= pokemonList.length) {
        messageDiv.textContent = "¡Felicidades! Atrapaste todos los Pokémon.";
        catchBtn.classList.add('disabled');
        return;
    }

    const pokemon = pokemonList[currentIndex];
    
    // Saltar a Yoshi automáticamente
    if (pokemon === 'Yoshi') {
        messageDiv.textContent = "¡Ups! Yoshi no es un Pokémon. Saltando...";
        currentIndex++;
        updateProgress();
        setTimeout(() => {
            catchBtn.click(); // Continuar automáticamente
        }, 1500);
        return;
    }

    // Crear tarjeta del Pokémon
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <img class="pokemon-image" src="images/${pokemon.toLowerCase()}.png" alt="${pokemon}">
        <div class="pokemon-name">${pokemon}</div>
        <div class="catch-message">¡Atrapaste un ${pokemon}!</div>
    `;
    
    pokemonContainer.appendChild(card);
    
    // Mensajes y efectos
    console.log(`You caught a ${pokemon}!`); // Consola
    messageDiv.textContent = `¡${pokemon} atrapado!`;
    playSound(pokemon); // Opcional: Reproduce sonido
    
    currentIndex++;
    updateProgress();
});