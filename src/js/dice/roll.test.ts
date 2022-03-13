import { roll } from './roll';

describe('roll', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
  });

  it('handles single dice correctly (d4, d6, d8, etc.)', () => {
    expect(roll('d4')).toEqual([1]);
    expect(roll('d6')).toEqual([1]);
    expect(roll('d8')).toEqual([1]);
    expect(roll('d10')).toEqual([1]);
    expect(roll('d12')).toEqual([1]);
    expect(roll('d20')).toEqual([1]);
  });

  it('handles multiple dice correctly (2d4, 4d8, etc.)', () => {
    expect(roll('2d4')).toEqual([1, 1]);
    expect(roll('3d6')).toEqual([1, 1, 1]);
    expect(roll('4d8')).toEqual([1, 1, 1, 1]);
    expect(roll('5d10')).toEqual([1, 1, 1, 1, 1]);
    expect(roll('6d12')).toEqual([1, 1, 1, 1, 1, 1]);
    expect(roll('7d20')).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });

  it('falls back to 1 dice and/or d4 with garbage input', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.25);

    expect(roll('garbage')).toEqual([1]);
    expect(roll('disaster')).toEqual([1]);
    expect(roll('2d or not 2d')).toEqual([1, 1]);
    expect(roll('sevend20')).toEqual([5]);
  });

  describe('single crits', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random')
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0.01);
    });

    it('rolls another d4 when the first roll is 4', () => {
      expect(roll('d4')).toEqual([4, 1]);
    });

    it('rolls another d6 when the first roll is 6', () => {
      expect(roll('d6')).toEqual([6, 1]);
    });

    it('rolls another d8 when the first roll is 8', () => {
      expect(roll('d8')).toEqual([8, 1]);
    });

    it('rolls another d10 when the first roll is 10', () => {
      expect(roll('d10')).toEqual([10, 1]);
    });

    it('rolls another d12 when the first roll is 12', () => {
      expect(roll('d12')).toEqual([12, 1]);
    });

    it('rolls another d20 when the first roll is 20', () => {
      expect(roll('d20')).toEqual([20, 1]);
    });
  });

  describe('multi crits', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random')
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0.01)
        .mockImplementationOnce(() => 0.01)
        .mockImplementationOnce(() => 0.01)
        .mockImplementationOnce(() => 0.01)
        .mockImplementationOnce(() => 0.01);
    });

    it('rolls all d4s again when every dice is 4', () => {
      expect(roll('5d4')).toEqual([4, 4, 4, 4, 4, 1, 1, 1, 1, 1]);
    });

    it('rolls all d6s again when every dice is 6', () => {
      expect(roll('5d6')).toEqual([6, 6, 6, 6, 6, 1, 1, 1, 1, 1]);
    });

    it('rolls all d8s again when every dice is 8', () => {
      expect(roll('5d8')).toEqual([8, 8, 8, 8, 8, 1, 1, 1, 1, 1]);
    });

    it('rolls all d10s again when every dice is 10', () => {
      expect(roll('5d10')).toEqual([10, 10, 10, 10, 10, 1, 1, 1, 1, 1]);
    });

    it('rolls all d12s again when every dice is 12', () => {
      expect(roll('5d12')).toEqual([12, 12, 12, 12, 12, 1, 1, 1, 1, 1]);
    });

    it('rolls all d20s again when every dice is 20', () => {
      expect(roll('5d20')).toEqual([20, 20, 20, 20, 20, 1, 1, 1, 1, 1]);
    });
  });
});
