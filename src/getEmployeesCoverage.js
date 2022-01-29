const data = require('../data/zoo_data');

const localizacao = 'localização';
const nome = 'nome';

const listDataEmployees = data.employees
  .map((employee) => [employee.id, employee.firstName, employee.lastName]);

function getSpeciesEmployees(employee, option) {
  const listSpeciesEmployees = [];
  let specieEmployee;
  for (let ind = 0; ind < employee.length; ind += 1) {
    if (option === nome) {
      specieEmployee = data.species.filter((specie) => specie.id === employee[ind])
        .map((specie) => specie.name);
    }
    if (option === localizacao) {
      specieEmployee = data.species.filter((specie) => specie.id === employee[ind])
        .map((specie) => specie.location);
    }
    listSpeciesEmployees.push(specieEmployee[0]);
  }
  return listSpeciesEmployees;
}

function getAllTokenCoverage() {
  const tokenCoverageAllEmployees = [];
  data.employees.forEach((employee) => {
    const tokenCoverage = {
      id: employee.id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      species: getSpeciesEmployees(employee.responsibleFor, nome),
      locations: getSpeciesEmployees(employee.responsibleFor, localizacao),
    };
    tokenCoverageAllEmployees.push(tokenCoverage);
  });
  return tokenCoverageAllEmployees;
}

function getTokenCoverage(id) {
  let tokenCoverageEmployee = {};
  data.employees.forEach((employee) => {
    if (employee.id === id) {
      tokenCoverageEmployee = {
        id: employee.id,
        fullName: `${employee.firstName} ${employee.lastName}`,
        species: getSpeciesEmployees(employee.responsibleFor, nome),
        locations: getSpeciesEmployees(employee.responsibleFor, localizacao),
      };
    }
  });
  return tokenCoverageEmployee;
}

function getVerifyRequest(request) {
  listDataEmployees.forEach((employee) => {
    if (employee.includes(request) === true) {
      console.log(employee[0]);
      getTokenCoverage(employee[0]);
    }
  });
  return 'requisição não localizada';
}

function getEmployeesCoverage(request) {
  // seu código aqui
  if (!request) return getAllTokenCoverage();
  return getVerifyRequest(request);
}

module.exports = getEmployeesCoverage;

console.log(getEmployeesCoverage('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// getEmployeesCoverage('Ola');
// getEmployeesCoverage('Azevado');
// console.log(getEmployeesCoverage());
