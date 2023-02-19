import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { searchWord } from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";

const useSearch = () => {
	const userID = useSelector(getUserID)
	const isLoading = useSelector(getLoading).searchWord?.isLoading

	const [value, setValue] = useState('')

	const handleChangeValue = (value: string) => {
		setValue(value)
	}

	useEffect(() => {
		if (value.length < 3) {
			return
		}

		searchWord(userID, value)
	}, [value])

	return {
		value,
		handleChangeValue,
		isLoading
	};
}
 
export default useSearch;