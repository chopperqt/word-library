import { useMemo } from "react";

import { normalizeWords } from "helpers/normalizeWords";

import type { Word } from "models/Library.models";

interface UseWordsProps {
  words: Word[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  const normalizedWords = useMemo(() => {
    let formattedWords = words;

    return Object.entries(normalizeWords(formattedWords));
  }, [words]);

  return {
    normalizedWords,
  };
};
