const data = require('../data/zoo_data');

const bdSpecies = data.species;

function getSpeciesByIds(ids, ...rest) {
  // seu código aqui
  const obj = [ids, ...rest];
  if (!obj[0]) return [];
  const species = [];
  obj.forEach((getId) => {
    bdSpecies.forEach((specie) => {
      if (specie.id === getId) species.push(specie);
    });
  });
  return species;
}

module.exports = getSpeciesByIds;
