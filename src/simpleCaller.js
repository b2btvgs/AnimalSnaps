'use strict';

const AnimalApiGroup = require('../src/animalSnaps');
let animalApiGroup = new AnimalApiGroup();

const randomDogImage = "https://dog.ceo/api/breeds/image/random";
const parallelAnimalUrls = [
    "https://random.dog/woof.json",
    "https://randomfox.ca/floof/"
];

async function simpleCaller() {
    let resultsArray = await animalApiGroup.handler(randomDogImage, parallelAnimalUrls);
    console.log(`ordered array of returned urls is: ${resultsArray}`);
}

simpleCaller();