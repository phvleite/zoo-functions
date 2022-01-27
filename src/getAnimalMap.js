const data = require('../data/zoo_data');

// Solução encontrada na branch de Queite Castiglioni - Turma 19 - Tribo A
// link: (https://github.com/tryber/sd-19-a-project-zoo-functions/blob/queite-zoo-functions-project/src/getAnimalMap.js)

const ne = data.species.filter((specie) => specie.location === 'NE');
const nw = data.species.filter((specie) => specie.location === 'NW');
const se = data.species.filter((specie) => specie.location === 'SE');
const sw = data.species.filter((specie) => specie.location === 'SW');

console.log(ne);

function getLocation() {
  return {
    NE: ne.map((specie) => specie.name),
    NW: nw.map((specie) => specie.name),
    SE: se.map((specie) => specie.name),
    SW: sw.map((specie) => specie.name),
  };
}

function getResidentsByName(location, sorted) {
  const residentsBySpecie = location.map((specie) => {
    const specieName = specie.name;
    const residents = specie.residents.map((resident) => resident.name);
    if (sorted) return { [specieName]: residents.sort() };
    return { [specieName]: residents };
  });
  return residentsBySpecie;
}

function getResidentsBySexFiltered(location, sex, sorted) {
  const residentsBySexFiltered = location.map((specie) => {
    const specieName = specie.name;
    const residents = specie.residents.filter(((resident) => resident.sex === sex))
      .map((resident) => resident.name);
    if (sorted) return { [specieName]: residents.sort() };
    return { [specieName]: residents };
  });
  return residentsBySexFiltered;
}

function createMapBySex(sex, sorted) {
  return {
    NE: getResidentsBySexFiltered(ne, sex, sorted),
    NW: getResidentsBySexFiltered(nw, sex, sorted),
    SE: getResidentsBySexFiltered(se, sex, sorted),
    SW: getResidentsBySexFiltered(sw, sex, sorted),
  };
}

function createMapByName(sorted) {
  const residentsByName = {
    NE: getResidentsByName(ne, sorted),
    NW: getResidentsByName(nw, sorted),
    SE: getResidentsByName(se, sorted),
    SW: getResidentsByName(sw, sorted),
  };
  return residentsByName;
}

function returnFilter(options) {
  if (options.sex && options.sorted === true) return createMapBySex(options.sex, options.sorted);
  if (options.sorted === true) return createMapByName(options.sorted);
  if (options.sex) return createMapBySex(options.sex);
  return createMapByName();
}

function getAnimalMap(options) {
  // seu código aqui
  if (!options || !options.includeNames) return getLocation();
  return returnFilter(options);
}

module.exports = getAnimalMap;
