// export const INFO = {
//   E: { value: 1, freq: 11.1607 },
//   A: { value: 1, freq: 8.4966 },
//   R: { value: 1, freq: 7.5809 },
//   I: { value: 1, freq: 7.5448 },
//   O: { value: 1, freq: 7.1635 },
//   T: { value: 1, freq: 6.9509 },
//   N: { value: 1, freq: 6.6544 },
//   S: { value: 1, freq: 5.7351 },
//   L: { value: 1, freq: 5.4893 },
//   C: { value: 2, freq: 4.5388 },
//   U: { value: 2, freq: 3.6308 },
//   D: { value: 2, freq: 3.3844 },
//   P: { value: 2, freq: 3.1671 },
//   M: { value: 2, freq: 3.0129 },
//   H: { value: 2, freq: 3.0034 },
//   G: { value: 2, freq: 2.4705 },
//   B: { value: 2, freq: 2.0720 },
//   F: { value: 2, freq: 1.8121 },
//   Y: { value: 2, freq: 1.7779 },
//   W: { value: 3, freq: 1.2899 },
//   K: { value: 3, freq: 1.1016 },
//   V: { value: 3, freq: 1.0074 },
//   X: { value: 3, freq: 0.2902 },
//   Z: { value: 4, freq: 0.2722 },
//   J: { value: 4, freq: 0.1965 },
//   Q: { value: 4, freq: 0.1962 },
// }


// add a "max" setting -- either a hard max, or a point after which probability swiftly decreases?
// max 3 in general maybe, once 2 are on board, -50% per extra
// a global vowel/consonant balance would be nice, too!
export const INFO = {
  E: { value: 1, freq: 20 },
  A: { value: 1, freq: 20 },
  R: { value: 1, freq: 16 },
  I: { value: 1, freq: 16 },
  O: { value: 1, freq: 14 },
  T: { value: 1, freq: 14 },
  N: { value: 1, freq: 13 },
  S: { value: 1, freq: 11 },
  L: { value: 1, freq: 11 },
  C: { value: 2, freq: 9 },
  U: { value: 2, freq: 7 },
  D: { value: 2, freq: 6 },
  P: { value: 2, freq: 6 },
  M: { value: 2, freq: 6 },
  H: { value: 2, freq: 6 },
  G: { value: 2, freq: 6 },
  B: { value: 2, freq: 5 },
  F: { value: 2, freq: 4 },
  Y: { value: 2, freq: 4 },
  W: { value: 3, freq: 3 },
  K: { value: 3, freq: 3 },
  V: { value: 3, freq: 2 },
  X: { value: 3, freq: 2 },
  Z: { value: 4, freq: 1 },
  J: { value: 4, freq: 1 },
  Q: { value: 4, freq: 1 },
}

let letters = ''

Object.keys(INFO).forEach(key => {
  const value = INFO[key].freq
  const x = Math.ceil(value * 10)
  for (let i =  0; i < x; i++) {
    letters += key
  }
})

export default letters
