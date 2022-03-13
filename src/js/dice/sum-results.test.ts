import { sumResults } from './sum-results';

describe('sumResults', () => {
  it('can do some pretty basic arithmetic', () => {
    expect(sumResults([1, 2, 3], 0)).toEqual(6);
    expect(sumResults([1, 2, 3], 4)).toEqual(10);
  });
});
