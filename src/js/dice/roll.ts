export const roll = (notation: string): number[] => {
  let numberOfDice = 1;
  let numberOfSides = 4;
  const results = [];
  const [dice, sides] = notation.split('d');

  if (dice !== '' && !Number.isNaN(Number.parseInt(dice, 10))) {
    numberOfDice = Number.parseInt(dice, 10);
  }

  if (sides !== '' && !Number.isNaN(Number.parseInt(sides, 10))) {
    numberOfSides = Number.parseInt(sides, 10);
  }

  for (let i = 0; i < numberOfDice; i += 1) {
    results.push(Math.ceil(Math.random() * numberOfSides));
  }

  // roll again if every dice rolled its highest value
  if (results.every((result) => result === numberOfSides)) {
    return results.concat(roll(notation));
  }

  return results;
};
