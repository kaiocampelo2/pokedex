// Abas da página de detalhes
const tabs = document.querySelectorAll('.det-link a');
const sections = document.querySelectorAll('#about, #stats, #evolution, #moves');

sections.forEach(function(section) {
  section.hidden = true;
});
document.querySelector('#about').hidden = false;

// Identifica o Pokémon pelo parâmetro ?id= da URL
const parametros = new URLSearchParams(window.location.search);
const pokemonId = parametros.get('id');
const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
const urlEspecie = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
const detailStatus = document.querySelector('#detail-status');

if (!pokemonId) {
  detailStatus.textContent = 'Nenhum Pokémon selecionado. Volte para a lista.';
} else {
  fetch(url)
    .then(function(response) {
      if (!response.ok) throw new Error('Pokémon não encontrado');
      return response.json();
    })
    .then(function(pokemon) {
      // Extrai peso e altura diretamente da PokéAPI
      const pesoPokemon = pokemon.weight / 10;
      const pesoElemento = document.querySelector('#pokemon-weight');
      pesoElemento.textContent = `${pesoPokemon} kg`;

      const alturaPokemon = pokemon.height / 10;
      const alturaElemento = document.querySelector('#pokemon-height');
      alturaElemento.textContent = `${alturaPokemon} m`;

      // Nome, imagem e número
      const nomeElemento = document.querySelector('#pokemon-name');
      nomeElemento.textContent = pokemon.name;
      document.title = `${pokemon.name} | Pokédex`;

      const imagemElemento = document.querySelector('#pokemon-image');
      imagemElemento.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
      imagemElemento.alt = pokemon.name;

      const numeroFormatado = String(pokemon.id).padStart(3, '0');
      const numeroElemento = document.querySelector('#pokemon-number');
      numeroElemento.textContent = `#${numeroFormatado}`;

      // Habilidades: map() cria o array de nomes e join() une com vírgulas
      const habilidadeElemento = document.querySelector('#pokemon-ability');
      const habilidades = pokemon.abilities.map(function(habilidade) {
        return habilidade.ability.name;
      });
      const habilidadesFormatadas = habilidades.join(', ');
      habilidadeElemento.textContent = habilidadesFormatadas;

      // Tipos e cor de fundo conforme o tipo principal
      const tiposElemento = document.querySelector('#pokemon-types');
      tiposElemento.innerHTML = '';
      pokemon.types.forEach(function(item) {
        tiposElemento.innerHTML += `<li class="type ${item.type.name}">${item.type.name}</li>`;
      });
      const tipoPrincipal = pokemon.types[0].type.name;
      const pokemonDetail = document.querySelector('.pokemon-detail');
      pokemonDetail.classList.add(tipoPrincipal);
    })
    .catch(function(error) {
      detailStatus.textContent = `Erro ao carregar Pokémon: ${error.message}`;
    });
}
// vai buscar os dados da especie e mostrar somente a propriedade genera no console

fetch(urlEspecie).then(function(response){
  return response.json();
}).then(function(especie){
    // Encontra a classificação em inglês
  const especieIngles = especie.genera.find(function(item){
    return item.language.name === 'en';
  });
  // Seleciona o elemento HTML
  const especieElemento = document.querySelector('#pokemon-species');
  // Exibe a espécie
  especieElemento.textContent = especieIngles.genus;
});

tabs.forEach(function(tab) {
  tab.addEventListener('click', function(event) {
    event.preventDefault();
    tabs.forEach(function(item) { item.classList.remove('active'); });
    sections.forEach(function(section) { section.hidden = true; });
    tab.classList.add('active');
    const destino = tab.getAttribute('href');
    const secaoSelecionada = document.querySelector(destino);
    secaoSelecionada.hidden = false;
  });
});


