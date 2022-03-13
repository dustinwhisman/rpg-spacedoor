import { roll } from './dice/roll';
import { sumResults } from './dice/sum-results';

const d4Roll = roll('d4');
const d6Roll = roll('2d6');
const d8Roll = roll('3d8');
const d10Roll = roll('4d10');
const d12Roll = roll('5d12');
const d20Roll = roll('6d20');

console.log(`Rolling d4: ${JSON.stringify({
  d4Roll,
  total: sumResults(d4Roll, 0),
})}`);

console.log(`Rolling 2d6 + 1: ${JSON.stringify({
  d6Roll,
  total: sumResults(d6Roll, 1),
})}`);

console.log(`Rolling 3d8 + 2: ${JSON.stringify({
  d8Roll,
  total: sumResults(d8Roll, 2),
})}`);

console.log(`Rolling 4d10 + 3: ${JSON.stringify({
  d10Roll,
  total: sumResults(d10Roll, 3),
})}`);

console.log(`Rolling 5d12 + 4: ${JSON.stringify({
  d12Roll,
  total: sumResults(d12Roll, 4),
})}`);

console.log(`Rolling 6d20 + 5: ${JSON.stringify({
  d20Roll,
  total: sumResults(d20Roll, 5),
})}`);
