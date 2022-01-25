const data = require('../data/zoo_data');

const bdEmployees = data.employees;
// const bdEmployeesManagers =

bdEmployees.forEach((employee) => {
  employee.managers.forEach((manager) => {
    console.log(manager);
  });
});

// console.log(bdEmployees);
/*
function isManager(id) {
  // seu código aqui
  return bdEmployees.forEach((employee) => {

  });
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  const manager = isManager(managerId);
  try {

  }
  catch(err) {

  }
}

module.exports = { isManager, getRelatedEmployees };
*/
