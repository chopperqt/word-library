import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { searchWord } from "api/library.api";
import { getUserID } from "services/user/User.store";

const useSearch = () => {
	const userID = useSelector(getUserID)

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
		handleChangeValue
	};
}
 
export default useSearch;