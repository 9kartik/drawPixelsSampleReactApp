export const memoize =  (fn : (_:unknown) => unknown) =>{
    let cache = null as unknown;
    return (args?:unknown) => {
      if(!cache)
        cache = fn(args);
      return cache;
    }
  }
  