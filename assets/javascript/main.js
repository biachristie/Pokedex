const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const scrollToTopButton = document.getElementById('jsTop');

let offset = 0;
const limit = 10;
const maxRecords = 151; //Limit: Pokémon first generation

// Load Pokémons
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <a class="pokemon-page" href="/pokemon-info.html?${pokemon.id}">
                    <div class="detail">
                        <span class="number">#${pokemon.id}</span>
                        <span class="name" >${pokemon.name}</span>
                        <img src="${pokemon.avatar}" alt="${pokemon.name}">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                </a>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Start Load More Button
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtyRecordNextPage = offset + limit;

    if (qtyRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Start Scroll to the Top Button
window.addEventListener('scroll', () => {
    let yAxis = window.scrollY;

    if (yAxis > 0) {
        scrollToTopButton.className = 'topLink show';
    } else {
        scrollToTopButton.className = 'topLink hide';
    }
});