import { Either } from './either';

describe('Either', () => {
  describe('of', () => {
    it('should create a valid instance', () => {
      const result = Either.of(1);
      expect(result instanceof Either).toBeTruthy();
      expect(result.extract()).toBe(1);
    });
    it('of should be accessible via type representative', () => {
      const result = Either.of(1);
      expect(result.type()).toBe(Either);
      expect(result.type().of).toBeInstanceOf(Function);
      expect(result.type().of).toBe(Either.of);
    });
  });
});
