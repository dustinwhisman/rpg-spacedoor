export const sumResults = (results: number[], bonus: number): number => {
  const dieResults = results.reduce((sum, result) => sum + result, 0);
  return dieResults + bonus;
};
