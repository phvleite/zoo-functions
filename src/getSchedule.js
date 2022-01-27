const data = require('../data/zoo_data');

const weekDay = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
let everydaySchedule = {};
let daySchedule = {};
const listAnimal = data.species.map((specie) => specie.name);

function getAnimalsDay(visit) {
  const { open, close } = data.hours[visit];
  const animalDay = data.species.filter((specie) => specie.availability
    .find((day) => day === visit)).map((specie) => specie.name);
  if (open === 0 && close === 0) return 'The zoo will be closed!';
  return animalDay;
}

function getDaysAnimal(animal) {
  const dayAnimal = data.species.filter((specie) => specie.name === animal)
    .map((specie) => specie.availability);
  return dayAnimal[0];
}

function getOfficeHour(day) {
  const { open, close } = data.hours[day];
  if (open === 0 && close === 0) return 'CLOSED';
  return `Open from ${open}am until ${close}pm`;
}

function getEverydaySchedule() {
  everydaySchedule = {};
  weekDay.forEach((day) => {
    everydaySchedule[day] = {
      officeHour: getOfficeHour(day),
      exhibition: getAnimalsDay(day),
    };
  });
  return everydaySchedule;
}

function getDaySchedule(day) {
  daySchedule = {};
  daySchedule[day] = {
    officeHour: getOfficeHour(day),
    exhibition: getAnimalsDay(day),
  };
  return daySchedule;
}

function getSpecificOption(scheduleTarget) {
  if (weekDay.includes(scheduleTarget)) return getDaySchedule(scheduleTarget);
  if (listAnimal.includes(scheduleTarget)) return getDaysAnimal(scheduleTarget);
}

function getSchedule(scheduleTarget) {
  // seu código aqui
  const verifyWeekDay = weekDay.includes(scheduleTarget);
  const verifyAnimalName = listAnimal.includes(scheduleTarget);
  if (!scheduleTarget) return getEverydaySchedule();
  if (!verifyAnimalName && !verifyWeekDay) return getEverydaySchedule();
  return getSpecificOption(scheduleTarget);
}

module.exports = getSchedule;
