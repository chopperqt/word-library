import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchWord } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";
import { clearSearch, getSearchWords } from "services/search/Search.store";

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

	return {
		searchWords,
		value,
		handleChangeValue,
		isLoading,
		isShowSearchedWord,
	};
}
 
export default useSearch;