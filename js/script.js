const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImagem = document.querySelector('.pokemon_imagem');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data; 
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...'; 
    pokemonNumber.innerHTML = '';
    pokemonImagem.style.display = 'none';
    
    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonImagem.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        
        // Check if it's a Pokémon from Gen V or earlier (ID <= 649)
        if (data.id <= 649) {
            pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else {
            // For Gen VI and later, use the regular sprite
            pokemonImagem.src = data.sprites.front_default;
        }
        
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found';    
        pokemonImagem.style.display = 'none';
        pokemonNumber.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';

});

buttonPrev.addEventListener('click', () => {
    if  (searchPokemon > 1) {
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    
      }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');