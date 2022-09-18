import { useMemo } from 'react'

import type { Word } from 'models/Library.models';
import normalizeWords from 'helpers/normalizeWords';

interface UseWordsProps {
  words: Word[]
  wordsPined: Word[]
  wordsSearched: Word[]
}
const useWords = ({
  words = [],
  wordsPined = [],
  wordsSearched = [],
}: UseWordsProps) => {
  const normalizedWords = useMemo(() => {
    let formattedWords = words

    if (wordsSearched.length > 0) {
      formattedWords = wordsSearched
    }

    return normalizeWords(formattedWords)
  }, [
    wordsSearched,
    words,
  ])

  const wordsTitle = `Library(${words.length})`
  const wordsPinedTitle = `Pined(${wordsPined.length})`

  return {
    normalizedWords,
    wordsTitle,
    wordsPinedTitle,
  };
}

export default useWords;