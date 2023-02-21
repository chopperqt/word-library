import { useSelector } from "react-redux";
import { useMemo } from "react";

import { normalizeWords } from "helpers/normalizeWords";
import { getLibraryWords, updateLibraryWord, updatePin } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";

import type { Word, WordForm } from "models/Library.models";
import { getLoading } from "services/loading/Loading.store";


interface UseWordsProps {
  words: Word[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  const userID = useSelector(getUserID)
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading

  const normalizedWords = useMemo(() => {
    let formattedWords = words;

    return Object.entries(normalizeWords(formattedWords));
  }, [words]);

  const handleClickPin = async (word: string, isPined:boolean) => {
    const response = await updatePin(word, !isPined, userID)

    if (response === null) {
      return
    }

    getLibraryWords(userID)
  }

  const handleSubmitUpdate = async (word: WordForm, wordID: number):Promise<Word[] | null>  => {
		const normalizedWord = getNormalizeWord(word)

		const response = await updateLibraryWord({
			...normalizedWord,
			wordID,
			userID,
		})

		if (response === null) {
			return null
		}

		getLibraryWords(userID)

    return response
	}

  return {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    isLoadingUpdate,
  };
};
