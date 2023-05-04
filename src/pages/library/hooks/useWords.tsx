import { useSelector } from "react-redux";
import { useMemo } from "react";

import { normalizeWords } from "helpers/normalizeWords";
import { deleteLibraryWords, getLibraryPinWords, getLibraryWords, updateLibraryWord, updatePin } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import { getLoading } from "services/loading/Loading.store";
import { getAmountOfPages } from "services/pagination/Pagination.store";
import { usePagination } from "helpers/usePagination";
import { getPinWords } from "services/library/Library.store";

import type { Word, WordForm } from "models/Library.models";
import { ParamsController } from "helpers/paramsController";


interface UseWordsProps {
  words: Word[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  const { getParam } = ParamsController()

  const page = getParam('page') || 1

  const userID = useSelector(getUserID)
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading
  const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading
  const amountOfPages = useSelector(getAmountOfPages)
  const pinedWords = useSelector(getPinWords)

  const isDisabledPin = useMemo(() => {
    return pinedWords.length >= 15
  }, [pinedWords])

  const { to } = usePagination({
    page: +page,
    amountOfPages
  })

  const normalizedWords = useMemo(() => {
    let formattedWords = words;

    return Object.entries(normalizeWords(formattedWords));
  }, [words]);

  const handleClickPin = async (word: string, isPined:boolean) => {
    const response = await updatePin(userID, !isPined,word)

    if (response === null) {
      return
    }

    getLibraryPinWords(userID)
    getLibraryWords({userID})
  }

  const handleSubmitUpdate = async (word: WordForm, wordID?: number):Promise<Word[] | null>  => {
    if (!wordID) {
      return null
    }

		const normalizedWord = getNormalizeWord(word)

		const response = await updateLibraryWord({
			...normalizedWord,
			wordID,
			userID,
		})

		if (response === null) {
			return null
		}

    getLibraryPinWords(userID)
		getLibraryWords({
      userID, 
      from: 0, 
      to
    })

    return response
	}

  const handleClickDelete = async (word: string):Promise<Word[] | null> => {
    const response = await deleteLibraryWords(userID, word)

    if (!response) {
      return null
    }

    getLibraryWords({
      userID, 
      from: 0, 
      to
    })
    getLibraryPinWords(userID)

    return response as Word[]
  }

  return {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingUpdate,
    isLoadingDelete,
    isDisabledPin,
    userID,
  };
};
