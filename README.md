# lodash-monad
Useful Functional Monades to use together with lodash library

## Motivation

Using *monad* pattern allows to get a lot of Functional Programming advantages in everyday tasks.

There are full-fledged implementions like [Ramda](https://ramdajs.com/). They are great libraries but it's power is sometimes too much for small projects. From the other side, using lodash/fp normally has a minimal overhead. Unfortunately, the *lodash/fp* doesn't have appropriate implementation :(

This library implements some useful *Monad* in a quite mimimalistic way and is designed to work on the top of excellent [lodash](https://github.com/lodash/lodash) / [lodash/fp](https://gist.github.com/jfmengels/6b973b69c491375117dc) stack with miminum overhead.
 
## Installation

```bash
> npm install --save-dev lodash-monad
``` 

## Concepts

### Fantasy land

Is it [Fantasy Land](https://github.com/fantasyland/fantasy-land) conformant?

Yes, it is! Specifications are in accrodance with the Fantasy Land concepts.

!["Fantasy land logo"](https://raw.github.com/fantasyland/fantasy-land/master/logo.png)

See also:
* http://www.tomharding.me/fantasy-land/
* https://github.com/fantasyland/fantasy-land

### Functor

### Applicable

### Monad

### Comonad

## Monades

### Identity

### Maybe

### Either

### Reader

### List
