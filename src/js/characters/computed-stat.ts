export const computedStat = (die: string, modifier: number) => {
  const highestValue = Number.parseInt(die.substring(1), 10);

  return (highestValue / 2) + modifier;
};
