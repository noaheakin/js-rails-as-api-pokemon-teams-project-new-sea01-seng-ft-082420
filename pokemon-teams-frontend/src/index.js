const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector('main')

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => renderTrainers(trainers))
}

const postPokemon = (e) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify ( {
            trainer_id: e.target.dataset.trainerId
        })
    }
    fetch(POKEMONS_URL, config)
    .then(res => res.json())
    .then(console.log)
}

const deletePokemon = (e) => {
    fetch(POKEMONS_URL + `${e.target.dataset.pokemonId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(getTrainers())
}

getTrainers()

function renderTrainers(trainers) {
    trainers.forEach(trainer => renderTrainerCard(trainer))
}

function renderTrainerCard(trainer) {
    let trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id
    trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button data-trainer-id${trainer.id}>Add Pokemon</button>
    `
    trainerCard.addEventListener('click', postPokemon)
    main.appendChild(trainerCard)

    let pokemonList = document.createElement('ul')
    trainerCard.appendChild(pokemonList)
    trainer.pokemons.forEach (pokemon => {
        let pokemonCard = document.createElement('li')
        pokemonCard.id = `pokemon-${pokemon.id}`
        pokemonCard.innerText = `
        ${pokemon.nickname}(${pokemon.species})
        `
        pokemonList.appendChild(pokemonCard)
        let releaseButton = document.createElement('button')
        releaseButton.className = 'release'
        releaseButton.dataset.pokemonId = pokemon.id
        releaseButton.innerText = 'Release'
        pokemonCard.appendChild(releaseButton)
        releaseButton.addEventListener('click', deletePokemon)
    })
    // renderPokemon(pokemon, pokemonList))
}

// function renderPokemon(pokemon, pokemonList) {
//     console.log(event)
//     let pokemonCard = document.createElement('li')
//     pokemonCard.id = `pokemon-${pokemon.id}`
//     pokemonCard.innerText = `
//         ${pokemon.nickname}(${pokemon.species})
//     `
    
// }

