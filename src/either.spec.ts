import { Either } from './either';

describe('Either', () => {
  describe('of', () => {
    it('should create a valid instance', () => {
      const result = Either.of(1);
      expect(result instanceof Either).toBeTruthy();
      expect(result.extract()).toBe(1);
    });
  });
});
