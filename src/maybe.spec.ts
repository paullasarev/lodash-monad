import { Just } from './maybe';

describe('Just', () => {
  it('should have of', () => {
    const result = Just.of(1);
    expect(result instanceof Just).toBeTruthy();
  });
});
