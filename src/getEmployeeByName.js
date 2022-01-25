const data = require('../data/zoo_data');

const bdEmployees = data.employees;

function getEmployeeByName(employeeName) {
  // seu código aqui
  let getEmployee = {};
  bdEmployees.forEach((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      getEmployee = employee;
    }
  });
  return getEmployee;
}

module.exports = getEmployeeByName;
