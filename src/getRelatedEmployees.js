const data = require('../data/zoo_data');

const dbEmployees = data.employees;

const getManagers = (() => {
  const dbManagers = [];
  dbEmployees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      dbManagers.push(manager);
    });
  });
  const newdbManagers = dbManagers.filter((elem, ind) => dbManagers.indexOf(elem) === ind);
  return newdbManagers;
});

const dbManagers = getManagers();

const getTeam = (() => {
  const dbTeam = [];
  dbEmployees.forEach((employee) => {
    const { id, managers, firstName, lastName } = employee;
    dbTeam.push({ id, managers, firstName, lastName });
  });
  const dbManagersTeam = [];
  dbManagers.forEach((manager) => {
    dbTeam.forEach((employee) => {
      employee.managers.forEach((response) => {
        if (manager === response) {
          dbManagersTeam.push([manager, [employee.id, employee.firstName, employee.lastName]]);
        }
      });
    });
  });
  return dbManagersTeam;
});

const dbTeam = getTeam();

function isManager(id) {
  let result = false;
  dbManagers.forEach((manager) => {
    if (manager === id) {
      result = true;
    }
  });
  return result;
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  try {
    if (!isManager(managerId)) {
      throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
    }
    const dbManagerTeam = [];
    dbTeam.forEach((id, idx, arr) => {
      if (managerId === arr[idx][0]) {
        dbManagerTeam.push(`${arr[idx][1][1]} ${arr[idx][1][2]}`);
      }
    });
    return dbManagerTeam;
  } catch (err) {
    throw err.message;
  }
}

module.exports = { isManager, getRelatedEmployees };
