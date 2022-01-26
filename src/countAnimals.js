const data = require('../data/zoo_data');

const dbSpecies = data.species;

const countAllAnimals = (() => {
  const countSpecies = {};
  dbSpecies.forEach((specie) => {
    countSpecies[`${specie.name}`] = specie.residents.length;
  });
  return countSpecies;
});

const countSpecie = ((animal) => {
  let qtdSpecie = 0;
  dbSpecies.forEach((specie) => {
    if (specie.name === animal) {
      qtdSpecie = specie.residents.length;
    }
  });
  return qtdSpecie;
});

const countSpecieSex = ((animal, sex) => {
  let qtdSpecieSex = 0;
  dbSpecies.forEach((specie) => {
    if (specie.name === animal) {
      specie.residents.forEach((resident) => {
        if (resident.sex === sex) {
          qtdSpecieSex += 1;
        }
      });
    }
  });
  return qtdSpecieSex;
});

function countAnimals(animal) {
  // seu código aqui
  if (typeof animal === 'undefined') {
    const countSpecies = countAllAnimals();
    return countSpecies;
  }
  if (Object.keys(animal).length === 1 && Object.keys(animal)[0] === 'specie') {
    const qtdSpecie = countSpecie(animal.specie);
    return qtdSpecie;
  }
  const qtdSpecieSex = countSpecieSex(animal.specie, animal.sex);
  return qtdSpecieSex;
}

module.exports = countAnimals;
