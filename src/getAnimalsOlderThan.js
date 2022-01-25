const data = require('../data/zoo_data');

const bdSpecies = data.species;

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const ageResident = [];
  bdSpecies.forEach((species) => {
    if (species.name === animal && species.residents.length > 0) {
      species.residents.forEach((resident) => {
        ageResident.push(resident.age);
      });
    }
  });
  return ageResident.every((elem) => elem >= age);
}

module.exports = getAnimalsOlderThan;
