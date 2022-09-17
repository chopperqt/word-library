export const checkUniqueWord = (str: string, words: string[]) => {
  return !words
    .filter((word) => {
      return word.toLowerCase().replaceAll(' ', '') === str.toLowerCase().replaceAll(' ', '')
    })
    .length
}