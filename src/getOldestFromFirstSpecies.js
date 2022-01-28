const data = require('../data/zoo_data');

const listaIdEmployees = data.employees.map((employee) => employee.id);

function getAnimalsResidentes() {
  const animalsResidents = data.species.map((specie) => [specie.name, specie.residents]);
  const dbAnimalsResidentes = [];
  for (let i = 0; i < animalsResidents.length; i += 1) {
    const specie = animalsResidents[i][0];
    dbAnimalsResidentes.push([specie, animalsResidents[i][1]
      .sort((a, b) => (b.age - a.age))
      .map((residente) => Object.values(residente))]);
  }
  return dbAnimalsResidentes;
}

const residents = getAnimalsResidentes();

function getOldSpecieEmployee(specie) {
  for (let ind = 0; ind < residents.length; ind += 1) {
    if (residents[ind][0] === specie) {
      return residents[ind][1][0];
    }
  }
}

function getSpecie(id) {
  let firstSpecieName;
  data.species.forEach((specie) => {
    if (specie.id === id) {
      firstSpecieName = specie.name;
    }
  });
  return getOldSpecieEmployee(firstSpecieName);
}

function getResult(id) {
  let firstSpecie;
  data.employees.forEach((employeeId) => {
    if (employeeId.id === id) {
      firstSpecie = employeeId.responsibleFor;
    }
  });
  return getSpecie(firstSpecie[0]);
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  if (!id) return 'Informe o id do funcionário';
  if (listaIdEmployees.includes(id)) return getResult(id);
  return 'Id não existente de funcionário!';
}

module.exports = getOldestFromFirstSpecies;
