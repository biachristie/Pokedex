const pokemonId = location.search.substring(1); //Capture Pokémon Id from page address
const pokemonTitle = document.getElementById('title');
const pokemonCardInfo = document.getElementById('pokemonCardInfo');
const pokemonSpecies = document.getElementById('species');
const pokemonHeight = document.getElementById('height');
const pokemonWeight = document.getElementById('weight');
const pokemonDescription = document.getElementById('pokemonDescription');
const pokemonStatsValue = document.getElementById('statsValue');
const statsBar = document.querySelector('.statsBar');

const offset = 0;
const limit = 151;

function filterPokemon(pokemons) {
    return pokemons.filter(pokemon => pokemon.id === pokemonId);
}

function getPokemonTitle(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => pokemon.name);
    const title = newHtml.toString().charAt(0).toUpperCase() + newHtml.toString().slice(1);

    pokemonTitle.innerHTML = title;
}

function getPokemonBasicInfo(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `
        <div class="image ${pokemon.type}">
            <img class="avatar" src="${pokemon.avatar}" alt="${pokemon.name}">
        </div>
        <div class="number">
            <span>#${pokemon.id}</span>
        </div>
        <div class="name">
            <span>${pokemon.name}<span>
        </div>
        <div class="typesSet">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
    `);

    pokemonCardInfo.innerHTML += newHtml;
}

function getPokemonSpecies(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `        
        <p class='data'>${pokemon.species}</p>
        <p class='dataDescription'>Species</p>
    `);

    pokemonSpecies.innerHTML += newHtml;
}

function getPokemonHeight(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `
        <p class='data'>${(pokemon.height)/10} m</p>
        <p class='dataDescription'>Height</p>
    `);

    pokemonHeight.innerHTML += newHtml;
}

function getPokemonWeight(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `
        <p class='data'>${(pokemon.weight)/10} kg</p>
        <p class='dataDescription'>Weight</p>
    `);

    pokemonWeight.innerHTML = newHtml;
}

function getPokemonDescription(filteredPokemon) {
    const description = filteredPokemon.map((pokemon) => pokemon.description);
    const descriptionEdited = description.toString().replace(/\n\r|\n|\r/gi, ' ').replace(/\u000c/g, ' ').replace(/POKéMON/g, 'pokémon');

    pokemonDescription.innerHTML += descriptionEdited;
}

function getPokemonStatsData(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `
        ${pokemon.statValues.map((value) => `<div class="value">${value}</div>`).join('')}
    `);

    pokemonStatsValue.innerHTML = newHtml;
}

function getPokemonStatsBar(filteredPokemon) {
    const newHtml = filteredPokemon.map((pokemon) => `
        ${pokemon.statValues.map((value) => `
            <div class='outterBar'>
                <div class='innerBar ${pokemon.type}' style="width: ${Math.min(value, 100)}%;"></div>
            </div>
        `).join('')}
    `);

    statsBar.innerHTML = newHtml;
}

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const filteredPokemon = filterPokemon(pokemons);

        getPokemonTitle(filteredPokemon);

        getPokemonBasicInfo(filteredPokemon);

        getPokemonHeight(filteredPokemon);

        getPokemonWeight(filteredPokemon);

        getPokemonStatsData(filteredPokemon);

        getPokemonStatsBar(filteredPokemon);
    })

    pokeApi.getPokemonsOther(offset, limit).then((pokemons = []) => {
        const filteredPokemon = filterPokemon(pokemons);

        getPokemonSpecies(filteredPokemon);

        getPokemonDescription(filteredPokemon);
    })
}

loadPokemon(offset, limit);
