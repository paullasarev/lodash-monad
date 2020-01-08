import { Identity } from './identity';
import { Func } from './types';

describe('Identity', () => {

  describe('map', () => {
    it('should return new instance', () => {
      const m = Identity.of(1);
      const result = m.map(x=>x+1);
      expect(result).not.toBe(m);
      expect(result instanceof Identity).toBeTruthy();
      expect(result.extract()).toBe(2);
    });
    it('should apply indentity', () => {
      // u['fantasy-land/map'](a => a)
      // is equivalent to
      // u
      // (identity)
      const u = Identity.of(1);
      const result1 = u.map(a=>a);
      const result2 = u;
      expect(result1).toEqual(result2);
    });
    it('should apply indentity', () => {
      // u['fantasy-land/map'](x => f(g(x)))
      // is equivalent to
      // u['fantasy-land/map'](g)['fantasy-land/map'](f)
      // (composition)
      const f = (x:number) => x+1;
      const g = (x:number) => x+2;
      const u = Identity.of(1);
      const result1 = u.map(x=>f(g(x)));
      const result2 = u.map(g).map(f);
      expect(result1).toEqual(result2);
    });
  });

  describe('chain', () => {
    it('should return new monad', () => {
      const m = Identity.of(1);
      const result = m.chain(Identity.of);
      expect(result).not.toBe(m);
      expect(result instanceof Identity).toBeTruthy();
      expect(result.extract()).toBe(1);
    });
    it('should apply associativity', () => {
      // m['fantasy-land/chain'](f)['fantasy-land/chain'](g)
      // is equivalent to
      // m['fantasy-land/chain'](x => f(x)['fantasy-land/chain'](g))
      // (associativity)
      const f = (x:number) => Identity.of(x+1);
      const g = (x:number) => Identity.of(x+2);
      const m = Identity.of(1);
      const result1 = m.chain(f).chain(g);
      const result2 = m.chain(x=>f(x).chain(g));
      expect(result1).toEqual(result2);
    });
  });

  describe('inspect', () => {
    it('should describe content', () => {
      const result = Identity.of(1);
      expect(result.inspect()).toBe('Identity.of(1)');
    });
  });

  describe('ap', () => {
    it('should apply applicative functor', () => {
      const a = Identity.of(1);
      const b = Identity.of(1).map(a => (b: number) => a + b);
      const result = a.ap(b);
      expect(result).toEqual(Identity.of(2));
    });
    it('should apply composition', () => {
      // https://github.com/fantasyland/fantasy-land#apply
      // v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x)))))
      // is equivalent to
      // v['fantasy-land/ap'](u)['fantasy-land/ap'](a)
      // (composition)
      const v = Identity.of(1);
      const u = Identity.of((b: number) => 1 + b);
      const a = Identity.of((b: number) => 3 + b);
      const result1 = v.ap(u.ap(a.map((f:Func<number,number>) => (g:Func<number,number>) => (x:number) => f(g(x)))));
      const result2 = v.ap(u).ap(a);
      expect(result1).toEqual(result2);
      expect(result1).toEqual(Identity.of(5));
    });
  });

  describe('aplicative', () => {
    it('of should create an instance', () => {
      const result = Identity.of(1);
      expect(result instanceof Identity).toBeTruthy();
    });
    it('of should be accessible via type representative', () => {
      const result = Identity.of(1);
      expect(result.type().of).toBeInstanceOf(Function);
    });
    it('should apply identity', () => {
      // v['fantasy-land/ap'](A['fantasy-land/of'](x => x)) is equivalent to v (identity)
      const v = Identity.of(1);
      const result = v.ap(Identity.of((x:number)=>x));
      expect(result).toEqual(v);
    });
    it('should apply homomorphism', () => {
      // A['fantasy-land/of'](x)['fantasy-land/ap'](A['fantasy-land/of'](f))
      // is equivalent to
      // A['fantasy-land/of'](f(x))
      // (homomorphism)
      const x = 1;
      const f = (x:number) => x;
      const result1 = Identity.of(x).ap(Identity.of(f));
      const result2 = Identity.of(f(x));
      expect(result1).toEqual(result2);
    });
    it('should apply interchange', () => {
      // A['fantasy-land/of'](y)['fantasy-land/ap'](u)
      // is equivalent to
      // u['fantasy-land/ap'](A['fantasy-land/of'](f => f(y)))
      // (interchange)
      const y = 1;
      const u = Identity.of((b: number) => 1 + b);
      const f = (x:number) => x;
      const result1 = Identity.of(y).ap(u);
      const result2 = u.ap(Identity.of(f=>f(y)));
      expect(result1).toEqual(result2);
    });
  });

  describe('monad', () => {
    it('should apply left identity', ()=>{
      // M['fantasy-land/of'](a)['fantasy-land/chain'](f)
      // is equivalent to
      // f(a)
      // (left identity)
      const a = 1;
      const f = (x:number) => Identity.of(x+1);
      const result1 = Identity.of(a).chain(f);
      const result2 = f(a);
      expect(result1).toEqual(result2);
    });
    it('should apply right identity', ()=>{
      // m['fantasy-land/chain'](M['fantasy-land/of'])
      // is equivalent to
      // m
      // (right identity)
      const m = Identity.of(1);
      const result1 = m.chain(Identity.of);
      const result2 = m;
      expect(result1).toEqual(result2);
    });
  });

  describe('extend', () => {
    it('should create identity', () => {
      const m = Identity.of(1);
      const result = m.extend(w=>w.extract()+1);
      expect(result instanceof Identity).toBeTruthy();
      expect(result.extract()).toBe(2);
    });
    it('should apply composition', () => {
      // w['fantasy-land/extend'](g)['fantasy-land/extend'](f)
      // is equivalent to
      // w['fantasy-land/extend'](_w => f(_w['fantasy-land/extend'](g)))
      const w = Identity.of(1);
      const f = (w:Identity<number>)=>w.extract() + 1;
      const g = (w:Identity<number>)=>w.extract() + 2;
      const result1 = w.extend(g).extend(f);
      const result2 = w.extend((_w=>f(_w.extend(g))));
      expect(result1).toEqual(result2);
    });
  });

  describe('comonad', () => {
    it('extract should return the value', () => {
      const result = Identity.of(1).extract();
      expect(result).toBe(1);
    });
    it('should apply left identity', () => {
      // w['fantasy-land/extend'](_w => _w['fantasy-land/extract']())
      // is equivalent to
      // w
      // (left identity)
      const w = Identity.of(1);
      const result1 = w.extend((_w) => _w.extract());
      const result2 = w;
      expect(result1).toEqual(result2);
    });
    it('should apply right identity', () => {
      // w['fantasy-land/extend'](f)['fantasy-land/extract']()
      // is equivalent to
      // f(w)
      // (right identity)
      const w = Identity.of(1);
      const f = (w: Identity<number>) => w.extract();
      const result1 = w.extend(f).extract();
      const result2 = f(w);
      expect(result1).toEqual(result2);
    });
  });


});

