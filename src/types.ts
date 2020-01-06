
export type MapFunc<A,R> = (arg: A) => R;

export interface Monad {
  map: (func: MapFunc<any,any>) => Monad;
  chain: (func: ChainFunc<any>) => Monad;
  join: () => any;
}

export type ChainFunc<A> = (arg: A) => Monad;
