import { usFirst } from "helpers/formatter";
import { WordForm } from "models/Library.models";

export const getNormalizeWord = ({
  word,
  translate,
  pined,
}: WordForm) => {
  const formattedWord = word.length
    ? usFirst(word)
    : word

  const formattedTranslate = translate.map((word) => usFirst(word.value))

  return {
    word: formattedWord,
    translate: formattedTranslate,
    pined,
  }
}