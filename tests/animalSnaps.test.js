'use strict';

var fetchMock = require('fetch-mock');
var assert = require('assert');
const AnimalApiGroup = require('../src/animalSnaps');
let animalApiGroup = new AnimalApiGroup();
jest.mock('../src/animalSnaps');

const randomDogImage = "https://dog.ceo/api/breeds/image/random";
const parallelAnimalUrls = [
    "https://random.dog/woof.json",
    "https://randomfox.ca/floof/"
];

beforeEach(() => {
    AnimalApiGroup.mockClear();
});

describe('animalApiGroup', () => {

    it('should be called when it is instantiated with "new"', () => {
        expect(AnimalApiGroup).not.toHaveBeenCalled();
        const animalApiGroup = new AnimalApiGroup();
        expect(AnimalApiGroup).toHaveBeenCalledTimes(1);
    });

    it('should return status code 200 from calling mocked url', async () => {
        fetchMock.mock('https://dog.ceo/api/breeds/image/random', 200);
        fetchMock.mock('https://random.dog/woof.json', 200);
        fetchMock.mock('https://randomfox.ca/floof/', 404);
        const res1 = await fetch('https://dog.ceo/api/breeds/image/random');
        const res2 = await fetch('https://random.dog/woof.json');
        const res3 = await fetch('https://randomfox.ca/floof/');
        assert(res1.ok);
        assert(res2.ok);
        assert(!res3.ok);
        fetchMock.restore();
    });
})