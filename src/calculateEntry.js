// const en = require('faker/lib/locales/en');
const data = require('../data/zoo_data');

// const dbEntrants = [
//   { name: 'Lara Carvalho', age: 5 },
//   { name: 'Frederico Moreira', age: 5 },
//   { name: 'Pedro Henrique Carvalho', age: 5 },
//   { name: 'Maria Costa', age: 18 },
//   { name: 'Núbia Souza', age: 18 },
//   { name: 'Carlos Nogueira', age: 50 },
// ];

const verifyAgeGroup = ((age) => {
  if (age < 18) {
    return 'child';
  }
  if (age >= 18 && age < 50) {
    return 'adult';
  }
  return 'senior';
});

const dbPrices = data.prices;

function countEntrants(entrants) {
  // seu código aqui
  let group = {};
  let child = 0;
  let adult = 0;
  let senior = 0;
  entrants.forEach((entrant) => {
    const ageGroup = verifyAgeGroup(entrant.age);
    if (ageGroup === 'adult') {
      adult += 1;
    } else if (ageGroup === 'child') {
      child += 1;
    } else {
      senior += 1;
    }
  });
  group = { adult, child, senior };
  return group;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) {
    return 0;
  }
  const group = Object.values(countEntrants(entrants));
  const { adult, senior, child } = dbPrices;
  const prices = Object.values({ adult, child, senior });
  const valorTotal = (group).map((elem, ind) => elem * prices[ind]).reduce((acm, crr) => acm + crr);
  return valorTotal;
}

module.exports = { calculateEntry, countEntrants };
