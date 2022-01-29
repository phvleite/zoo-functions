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
  const [valueRequest] = Object.values(id);
  let idEmployee = '';
  listDataEmployees.forEach((employee) => {
    if (employee.includes(valueRequest)) [idEmployee] = employee;
  });
  let tokenCoverageEmployee = {};
  data.employees.forEach((employee) => {
    if (employee.id === idEmployee) {
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
  let verifyEmployee = false;
  const [valueRequest] = Object.values(request);
  listDataEmployees.forEach((employee) => {
    if (employee.includes(valueRequest)) {
      verifyEmployee = true;
    }
  });
  return verifyEmployee;
}

function getEmployeesCoverage(request) {
  // seu código aqui
  try {
    if (!request) return getAllTokenCoverage();
    if (!getVerifyRequest(request)) {
      throw new Error('Informações inválidas');
    }
    return getTokenCoverage(request);
  } catch (err) {
    throw err.message;
  }
}

module.exports = getEmployeesCoverage;
