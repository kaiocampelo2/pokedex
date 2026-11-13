const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.types = pokeDetail.types.map(item => item.type.name);
  pokemon.type = pokemon.types[0];
  pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default || pokeDetail.sprites.front_default;
  return pokemon;
}

pokeApi.getPokemonDetail = function(pokemon) {
  return fetch(pokemon.url)
    .then(response => {
      if (!response.ok) throw new Error('Falha ao buscar detalhes do Pokémon');
      return response.json();
    })
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = function(offset = 0, limit = 10) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(response => {
      if (!response.ok) throw new Error('Falha ao buscar lista de Pokémon');
      return response.json();
    })
    .then(json => Promise.all(json.results.map(pokeApi.getPokemonDetail)));
};
