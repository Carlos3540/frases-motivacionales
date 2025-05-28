
        // Frases motivacionales
        const quotes = [
            { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier" },
            { text: "No esperes por el momento perfecto, toma el momento y hazlo perfecto.", author: "Anónimo" },
            { text: "La única manera de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
            { text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt" },
            { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
            { text: "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.", author: "Charles R. Swindoll" },
            { text: "Si puedes soñarlo, puedes lograrlo.", author: "Walt Disney" },
            { text: "El único límite para nuestros logros de mañana son nuestras dudas de hoy.", author: "Franklin D. Roosevelt" },
            { text: "No te rindas. Normalmente es la última llave del manojo la que abre la puerta.", author: "Paulo Coelho" },
            { text: "La diferencia entre lo ordinario y lo extraordinario es ese pequeño extra.", author: "Jimmy Johnson" },
            { text: "Todo gran logro fue una vez considerado imposible.", author: "Anónimo" },
            { text: "El fracaso es simplemente la oportunidad de comenzar de nuevo con más inteligencia.", author: "Henry Ford" },
            { text: "Tu única limitación eres tú mismo.", author: "Anónimo" },
            { text: "Las grandes cosas nunca vienen de las zonas de confort.", author: "Anónimo" },
            { text: "Cree en ti mismo y todo será posible.", author: "Anónimo" }
        ];

        // Variables globales
        let currentQuote = {};
        let favorites = [];
        let showingFavorites = false;

        // Elementos DOM
        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('author');
        const newQuoteBtn = document.getElementById('newQuoteBtn');
        const favoriteBtn = document.getElementById('favoriteBtn');
        const toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');
        const favoritesList = document.getElementById('favoritesList');

        // Función para mostrar una nueva frase
        function displayNewQuote() {
            // Animación de salida
            quoteElement.classList.remove('show');
            authorElement.classList.remove('show');
            
            setTimeout(() => {
                // Seleccionar frase aleatoria
                const randomIndex = Math.floor(Math.random() * quotes.length);
                currentQuote = quotes[randomIndex];
                
                // Actualizar contenido
                quoteElement.textContent = `"${currentQuote.text}"`;
                authorElement.textContent = `— ${currentQuote.author}`;
                
                // Animación de entrada
                setTimeout(() => {
                    quoteElement.classList.add('show');
                    authorElement.classList.add('show');
                }, 50);
            }, 250);
        }

        // Función para agregar/quitar favoritos
        function toggleFavorite() {
            if (!currentQuote.text) return;
            
            const existingIndex = favorites.findIndex(fav => fav.text === currentQuote.text);
            
            if (existingIndex === -1) {
                favorites.push(currentQuote);
                favoriteBtn.textContent = '💖 Agregado';
                setTimeout(() => {
                    favoriteBtn.textContent = '❤️ Favorito';
                }, 1000);
            } else {
                favorites.splice(existingIndex, 1);
                favoriteBtn.textContent = '💔 Removido';
                setTimeout(() => {
                    favoriteBtn.textContent = '❤️ Favorito';
                }, 1000);
            }
            
            saveFavorites();
            if (showingFavorites) {
                displayFavorites();
            }
        }

        // Función para alternar vista de favoritos
        function toggleFavorites() {
            showingFavorites = !showingFavorites;
            
            if (showingFavorites) {
                displayFavorites();
                favoritesList.style.display = 'block';
                toggleFavoritesBtn.textContent = 'Ocultar Favoritos';
            } else {
                favoritesList.style.display = 'none';
                toggleFavoritesBtn.textContent = 'Ver Favoritos';
            }
        }

        // Función para mostrar favoritos
        function displayFavorites() {
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 20px;">No tienes frases favoritas aún</p>';
                return;
            }
            
            favoritesList.innerHTML = favorites.map((quote, index) => `
                <div class="favorite-item">
                    <button class="remove-favorite" onclick="removeFavorite(${index})">×</button>
                    <div>"${quote.text}"</div>
                    <div style="font-style: italic; opacity: 0.8; margin-top: 5px;">— ${quote.author}</div>
                </div>
            `).join('');
        }

        // Función para remover favorito
        function removeFavorite(index) {
            favorites.splice(index, 1);
            saveFavorites();
            displayFavorites();
        }

        // Guardar favoritos en memoria
        function saveFavorites() {
            // En un entorno real, aquí guardarías en localStorage
            // localStorage.setItem('motivationalFavorites', JSON.stringify(favorites));
        }

        // Cargar favoritos (simulado)
        function loadFavorites() {
            // En un entorno real, cargarías desde localStorage
            // const saved = localStorage.getItem('motivationalFavorites');
            // if (saved) favorites = JSON.parse(saved);
        }

        // Event listeners
        newQuoteBtn.addEventListener('click', displayNewQuote);
        favoriteBtn.addEventListener('click', toggleFavorite);
        toggleFavoritesBtn.addEventListener('click', toggleFavorites);

        // Inicialización
        loadFavorites();
        displayNewQuote();

        // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registrado', reg))
    .catch(err => console.error('Error al registrar el Service Worker', err));
}