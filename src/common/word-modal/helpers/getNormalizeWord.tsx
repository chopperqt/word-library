import { usFirst } from "helpers/formatter";
import { WordForm } from "models/Library.models";

export const getNormalizeWord = ({ word, translate, pined }: WordForm) => {
  console.log("word: ", word);

  const formattedWord = word.length ? usFirst(word) : word;

  return {
    word: formattedWord,
    translate,
    pined: !!pined,
  };
};
