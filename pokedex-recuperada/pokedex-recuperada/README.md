# Pokédex — projeto recuperado

Reconstrução funcional do projeto desenvolvido nas aulas, até a etapa de habilidades com `map()` e `join()`.

## Como abrir

1. Extraia o ZIP.
2. Abra a pasta `pokedex-recuperada` no VS Code.
3. Instale/ative a extensão **Live Server** (se ainda não tiver).
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
5. É necessária conexão com a internet para carregar os dados e imagens da PokéAPI.

## Estrutura

- `index.html`: lista de Pokémon e botão Load More (10 por vez, até 151).
- `detail-pokemon.html`: página de detalhes e abas.
- `assets/css/global.css`, `pokedex.css`, `details.css`: estilos.
- `assets/js/pokemon-model.js`, `poke-api.js`, `main.js`, `details.js`: lógica JavaScript.

## Concluído

- Lista dinâmica e links para `detail-pokemon.html?id=...`.
- Nome, número, imagem, tipos, cor, altura, peso e habilidades dinâmicos.
- Abas clicáveis com About exibida inicialmente.

## Próximas aulas (ainda não implementadas)

- Species usando `/pokemon-species/{id}` e `genera`.
- Dados de Base Stats, Evolution, Moves e Breeding.

> Esta é uma reconstrução baseada no histórico da conversa, não uma cópia byte a byte dos arquivos perdidos.
