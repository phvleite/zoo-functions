// const en = require('faker/lib/locales/en');
const data = require('../data/zoo_data');

// Alteração sugerida por Raphael Martins - Link: (https://github.com/raphaelalmeidamartins)
const verifyAgeGroup = ((age) => {
  if (age < 18) return 'child';
  if (age >= 18 && age < 50) return 'adult';
  return 'senior';
});

const dbPrices = data.prices;

// Alteração sugerida por Raphael Martins - Link: (https://github.com/raphaelalmeidamartins)
function countEntrants(entrants) {
  // seu código aqui
  let group = {};
  let child = 0;
  let adult = 0;
  let senior = 0;
  entrants.forEach((entrant) => {
    const ageGroup = verifyAgeGroup(entrant.age);
    if (ageGroup === 'adult') adult += 1;
    if (ageGroup === 'child') child += 1;
    if (ageGroup === 'senior') senior += 1;
  });
  group = { adult, child, senior };
  return group;
}

// Alteração sugerida por Raphael Martins - Link: (https://github.com/raphaelalmeidamartins)
function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const group = Object.values(countEntrants(entrants));
  const { adult, senior, child } = dbPrices;
  const prices = Object.values({ adult, child, senior });
  const valorTotal = (group).map((elem, ind) => elem * prices[ind]).reduce((acm, crr) => acm + crr);
  return valorTotal;
}

module.exports = { calculateEntry, countEntrants };
