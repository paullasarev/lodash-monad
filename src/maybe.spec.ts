import { Maybe } from './maybe';
import { nullFunc } from './utils';

describe('Maybe', () => {
  describe('of', () => {
    it('should create a Just instance', () => {
      const result = Maybe.of(1);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(1);
      expect(result.isNull).toBeFalsy();
    });
    it('should create a null instance for null', () => {
      const result = Maybe.of(null);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(null);
      expect(result.isNull).toBeTruthy();
    });
    it('should create a null instance for undefined', () => {
      const result = Maybe.of(undefined);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(null);
      expect(result.isNull).toBeTruthy();
    });
  });

  describe('functor', () => {
    it('should return valid instance', () => {
      const m = Maybe.of(1);
      const result = m.map(x=>x+1);
      expect(result).not.toBe(m);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(2);
      expect(result.isNull).toBeFalsy();
    });
    it('should return null instance', () => {
      const m = Maybe.of(1);
      const result = m.map(x=>null);
      expect(result.extract()).toBe(null);
      expect(result.isNull).toBeTruthy();
    });
  });

  describe('apply', () => {
    it('should apply applicative functor with valid result', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(1).map(a => (b: number) => a + b);
      const result = a.ap(b);
      expect(result).toEqual(Maybe.of(2));
    });
    it('should apply applicative functor with null result', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(1).map(a => nullFunc);
      const result = a.ap(b);
      expect(result.isNull).toBeTruthy();
    });
  });

  describe('chain', () => {
    it('should return new valid instance', () => {
      const m = Maybe.of(1);
      const result = m.chain(Maybe.of);
      expect(result).not.toBe(m);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(1);
      expect(result.isNull).toBeFalsy();
    });
    it('should return new null instance', () => {
      const m = Maybe.of(1);
      const result = m.chain(() => Maybe.of(null));
      expect(result.isNull).toBeTruthy();
    });
  });

  describe('extend', () => {
    it('should create valid instance', () => {
      const m = Maybe.of(1);
      const result = m.extend(w=>w.extract()+1);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.extract()).toBe(2);
      expect(result.isNull).toBeFalsy();
    });
    it('should create null instance', () => {
      const m = Maybe.of(1);
      const result = m.extend(nullFunc);
      expect(result instanceof Maybe).toBeTruthy();
      expect(result.isNull).toBeTruthy();
    });
  });

  describe('getOrElse', () => {
    it('should return value for valid instance', () => {
      const result = Maybe.of(1);
      expect(result.getOrElse()).toBe(1);
    });
    it('should create default value for null instance', () => {
      const m = Maybe.of(1);
      const result = m.map<number>(nullFunc);
      expect(result.getOrElse(0)).toBe(0);
    });
  });

});
