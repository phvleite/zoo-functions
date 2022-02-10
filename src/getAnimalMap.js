const data = require('../data/zoo_data');

function getGeoLocations() {
  const allLocations = data.species.map((specie) => specie.location);
  const geoLocations = allLocations.filter((local, ind) => allLocations.indexOf(local) === ind);
  return geoLocations;
}

function getSpeciesLocations(geoLocations) {
  const localSpecies = {};
  geoLocations.forEach((local) => {
    const species = Object.values(data.species.filter((specie) => specie.location === local));
    localSpecies[local] = species;
  });
  return localSpecies;
}

function getResidentsSpecies() {
  const allSpecies = data.species.map((specie) => [specie.name, specie.residents]);
  const allResidentsBySpecie = [];
  allSpecies.forEach((specie) => {
    const residents = [];
    for (let ind = 0; ind < specie[1].length; ind += 1) {
      residents.push(specie[1][ind]);
    }
    allResidentsBySpecie.push([specie[0], residents]);
  });
  return allResidentsBySpecie;
}

function getResidentsBySex(sex, sorted) {
  const allResidentsBySpecie = getResidentsSpecies();
  const allSpeciesBySex = {};
  allResidentsBySpecie.forEach((specie) => {
    const allResidentsBySex = [];
    for (let ind = 0; ind < specie[1].length; ind += 1) {
      if (specie[1][ind].sex === sex) {
        allResidentsBySex.push(specie[1][ind].name);
      }
    }
    if (sorted) allResidentsBySex.sort();
    allSpeciesBySex[specie[0]] = allResidentsBySex;
  });
  return allSpeciesBySex;
}

function getGeoSpeciesResidentsLocationsBySex(sex, sorted) {
  const allSpeciesbySex = getResidentsBySex(sex, sorted);
  const geoLocations = getGeoLocations();
  const speciesLocations = getSpeciesLocations(geoLocations);
  let residenstLocal = [];
  const geoResidentsLocal = {};
  geoLocations.forEach((local) => {
    for (let ind = 0; ind < speciesLocations[local].length; ind += 1) {
      const specie = speciesLocations[local][ind].name;
      const speciesLocal = {};
      speciesLocal[specie] = allSpeciesbySex[specie];
      residenstLocal.push(speciesLocal);
    }
    geoResidentsLocal[local] = residenstLocal;
    residenstLocal = [];
  });
  return geoResidentsLocal;
}

function getGeoSpeciesLocations() {
  const geoLocations = getGeoLocations();
  const speciesLocations = getSpeciesLocations(geoLocations);
  const geoLocationSpecie = {};
  geoLocations.forEach((local) => {
    const localSpecie = [];
    for (let ind = 0; ind < speciesLocations[local].length; ind += 1) {
      localSpecie.push(speciesLocations[local][ind].name);
    }
    geoLocationSpecie[local] = localSpecie;
  });
  return geoLocationSpecie;
}

function geoSpeciesResidentsLocations(local, geoLocations, sorted) {
  const speciesLocations = getSpeciesLocations(geoLocations);
  const speciesResidents = [];
  for (let ind = 0; ind < speciesLocations[local].length; ind += 1) {
    const residents = [];
    const specie = speciesLocations[local][ind].name;
    const localSpecie = {};
    for (let idx = 0; idx < speciesLocations[local][ind].residents.length; idx += 1) {
      residents.push(speciesLocations[local][ind].residents[idx].name);
    }
    if (sorted) localSpecie[specie] = residents.sort();
    localSpecie[specie] = residents;
    speciesResidents.push(localSpecie);
  }
  return speciesResidents;
}

function getGeoSpeciesResidentsLocations(sorted) {
  const geoLocations = getGeoLocations();
  const geoLocationSpecie = {};
  geoLocations.forEach((local) => {
    geoLocationSpecie[local] = geoSpeciesResidentsLocations(local, geoLocations, sorted);
  });
  return geoLocationSpecie;
}

function returnFilter(options) {
  if (options.sex && options.sorted === true) {
    return getGeoSpeciesResidentsLocationsBySex(options.sex, options.sorted);
  }
  if (options.sorted === true) {
    return getGeoSpeciesResidentsLocations(options.sorted);
  }
  if (options.sex) return getGeoSpeciesResidentsLocationsBySex(options.sex);
  return getGeoSpeciesResidentsLocations();
}

function getAnimalMap(options) {
  // seu código aqui
  if (!options || !options.includeNames) {
    return getGeoSpeciesLocations();
  }
  return returnFilter(options);
}

const options = { includeNames: true, sex: 'female' };

console.log(getAnimalMap(options));

module.exports = getAnimalMap;
