import * as bdx from '../index';

describe('bdx', () => {
  test('exports modules correctly', () => {
    expect(Object.keys(bdx)).toMatchSnapshot();
  });
});
