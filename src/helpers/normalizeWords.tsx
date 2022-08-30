import type { Word } from "../mockData";

export type Alphabet =
  'a' |
  'b' |
  'c' |
  'd' |
  'e' |
  'f' |
  'g' |
  'h' |
  'i' |
  'j' |
  'k' |
  'l' |
  'm' |
  'n' |
  'o' |
  'p' |
  'q' |
  'r' |
  's' |
  't' |
  'u' |
  'v' |
  'w' |
  'x' |
  'y' |
  'z'

interface NormalizeWords {
  a: Word[]
  b: Word[]
  c: Word[]
  d: Word[]
  e: Word[]
  f: Word[]
  g: Word[]
  h: Word[]
  i: Word[]
  j: Word[]
  k: Word[]
  l: Word[]
  m: Word[]
  n: Word[]
  o: Word[]
  p: Word[]
  q: Word[]
  r: Word[]
  s: Word[]
  t: Word[]
  u: Word[]
  v: Word[]
  w: Word[]
  x: Word[]
  y: Word[]
  z: Word[]
}

const normalizeWords = (words: Word[]): NormalizeWords => {
  const initialObject: NormalizeWords = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  }

  for (let word of words) {
    const firstChar = word.english[0][0] as Alphabet

    initialObject[firstChar] = [
      ...initialObject[firstChar],
      word,
    ]

  }


  return initialObject
}

export default normalizeWords