import { Word } from "models/Library.models"

export const checkUniqueWord = (str: string, words: Word[]) => {
  return !words.filter(({ word }) => word.toLowerCase().replaceAll(' ', '') === str.toLowerCase().replaceAll(' ', '')).length
}