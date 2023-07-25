import { GetPositionPipe } from './get-position.pipe';

describe('GetPositionPipe', () => {

  it('should return correct row and column of nth-indexed element', () => {
    const pipe = new GetPositionPipe();

    expect(pipe.transform(12, 8)).toEqual({row: 2, column: 5});
    expect(pipe.transform(12, 6)).toEqual({row: 3, column: 1});
    expect(pipe.transform(4, 8)).toEqual({row: 1, column: 5});
  });
});
