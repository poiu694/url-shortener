// https://datatracker.ietf.org/doc/html/rfc4648#page-7
// https://developer.mozilla.org/ko/docs/Glossary/Base64

const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const base62 = {
  encode: (id: number): string => {
    let result = [];
    while (id) {
      result = [...result, BASE62[id % BASE62.length]];
      id = Math.floor(id / BASE62.length);
    }
    return result.reverse().join('');
  },
  decode: (url: string): number => {
    return url
      .split('')
      .reverse()
      .reduce((acc, cur, index) => {
        return acc + BASE62.indexOf(cur) * Math.pow(BASE62.length, index);
      }, 0);
  },
};
