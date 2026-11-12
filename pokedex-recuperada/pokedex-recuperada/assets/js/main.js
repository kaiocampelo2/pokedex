const pokemonList = document.querySelector('#pokemonList');
const loadMoreButton = document.querySelector('#loadMoreButton');
const listStatus = document.querySelector('#list-status');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function pokemonToHtml(pokemon) {
  const types = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
  return `<li class="pokemon ${pokemon.type}" style="background-color:${typeColor(pokemon.type)}">
    <a href="detail-pokemon.html?id=${pokemon.number}" aria-label="Ver detalhes de ${pokemon.name}">
      <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail"><ol class="types">${types}</ol><img src="${pokemon.photo || ''}" alt="${pokemon.name}" loading="lazy"></div>
    </a>
  </li>`;
}

function typeColor(type) {
  const colors = {grass:'#65a843',fire:'#e65a3a',water:'#5395d0',electric:'#e6b72d',poison:'#9865b0',bug:'#8ca52b',normal:'#9a9b8c',ground:'#b79b55',fairy:'#d88eb4',fighting:'#bc594a',psychic:'#dc6894',rock:'#aa9757',ghost:'#7468a1',ice:'#6fb5c4',dragon:'#7764bd',dark:'#6d625c',steel:'#8a9ba9',flying:'#8b9fc6'};
  return colors[type] || '#777';
}

function loadPokemonItems() {
  const nextLimit = Math.min(limit, maxRecords - offset);
  if (nextLimit <= 0) return;
  loadMoreButton.disabled = true;
  listStatus.textContent = 'Carregando Pokémon...';
  pokeApi.getPokemons(offset, nextLimit)
    .then(pokemons => {
      pokemonList.insertAdjacentHTML('beforeend', pokemons.map(pokemonToHtml).join(''));
      offset += pokemons.length;
      loadMoreButton.hidden = offset >= maxRecords;
      listStatus.textContent = '';
    })
    .catch(error => { listStatus.textContent = `Não foi possível carregar: ${error.message}`; })
    .finally(() => { loadMoreButton.disabled = offset >= maxRecords; });
}

loadMoreButton.addEventListener('click', loadPokemonItems);
loadPokemonItems();
