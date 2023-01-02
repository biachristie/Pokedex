const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.id = pokeDetail.id.toString().padStart(3, '0');

    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.avatar = pokeDetail.sprites.other["official-artwork"].front_default;

    pokemon.height = pokeDetail.height;

    pokemon.weight = pokeDetail.weight;

    const pokemonStatValues = pokeDetail.stats.map((baseStat) => baseStat.base_stat);
    const [statValue] = pokemonStatValues;
    pokemon.statValues = pokemonStatValues;
    pokemon.statValue = statValue;
    
    return pokemon;
}

function convertPokeApiDescriptionToPokemon(pokeDescription) {
    const pokemon = new PokemonStats();
    
    pokemon.id = pokeDescription.id.toString().padStart(3, '0');
    
    const descriptions = pokeDescription.flavor_text_entries.map((textEntry) => textEntry.flavor_text);
    // const [description] = descriptions;
    pokemon.descriptions = descriptions;
    pokemon.description = descriptions[6]; 
    
    
    const collectiveSpecies = pokeDescription.genera.map((slot) => slot.genus);
    // const [species] = collectiveSpecies;
    pokemon.collectiveSpecies = collectiveSpecies;
    pokemon.species = collectiveSpecies[7];

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDescription = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDescriptionToPokemon)
}

pokeApi.getPokemonsOther = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => (jsonBody.results))
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDescription))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
