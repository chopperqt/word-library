import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraryWords, searchWord, updateLibraryWord, updatePin } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";
import { clearSearch, getSearchWords } from "services/search/Search.store";

import  type{ WordForm } from "models/Library.models";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";

const useSearch = () => {
	const dispatch = useDispatch()

	const userID = useSelector(getUserID)
	const searchWords = useSelector(getSearchWords)
	const isLoading = useSelector(getLoading).searchWord?.isLoading

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

	const handleClickUpdate = async (wordID: number, word: WordForm) => {
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
	}

	return {
		searchWords,
		value,
		handleChangeValue,
		isLoading,
		isShowSearchedWord,
		handleClickPin,
		handleClickUpdate,
	};
}
 
export default useSearch;