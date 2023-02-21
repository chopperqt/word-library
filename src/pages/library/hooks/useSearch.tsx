import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteLibraryWords, getLibraryWords, searchWord, updateLibraryWord, updatePin } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";
import { clearSearch, getSearchWords } from "services/search/Search.store";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";

import  type{ Word, WordForm } from "models/Library.models";

const useSearch = () => {
	const dispatch = useDispatch()

	const userID = useSelector(getUserID)
	const searchWords = useSelector(getSearchWords)
	const isLoading = useSelector(getLoading).searchWord?.isLoading
	const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading
	const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading

	const [value, setValue] = useState('')

	const handleChangeValue = (value: string) => {
		setValue(value)
	}

	useEffect(() => {
		dispatch(clearSearch())

		if (value.length < 3) {
			return
		}

		searchWord(userID, value)
	}, [value])

	const isShowSearchedWord = useMemo(() => {
		if (value.length !== 0 && searchWords.length) {
			return true
		} 

		return false
	}, [searchWords, value])

	const handleClickPin = (word: string, isPined: boolean) => {
		const response = updatePin(userID, isPined, word)

		if (response === null) {
			return
		}

		getLibraryWords(userID)
	}

	const handleSubmitUpdate = async (word: WordForm, wordID?: number):Promise<Word[] | null> => {
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

		getLibraryWords(userID)

		return response
	}

	const handleClickDelete = async (word:string):Promise<Word[] | null> => {
		const response = await deleteLibraryWords(userID, word)

		if (response === null) {
			return null
		}

		return response as Word[]
	}

	return {
		searchWords,
		value,
		handleChangeValue,
		isLoading,
		isShowSearchedWord,
		handleClickPin,
		handleSubmitUpdate,
		handleClickDelete,
		isLoadingDelete,
		isLoadingUpdate,
	};
}
 
export default useSearch;