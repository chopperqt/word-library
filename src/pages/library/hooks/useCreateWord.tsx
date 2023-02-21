import { useSelector } from "react-redux";

import { createLibraryWord } from "api/library.api";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import { getUserID } from "services/user/User.store";

import type { Word, WordForm } from "models/Library.models";
import { getLoading } from "services/loading/Loading.store";
import { getOnlyWords } from "services/library/Library.store";

const useCreateWord = () => {
	const userID = useSelector(getUserID)
	const isLoading = useSelector(getLoading).createLibraryWord?.isLoading
	const words = useSelector(getOnlyWords)

	const onSubmit = async (word:WordForm):Promise<Word[] | null> => {
		if (!userID) {
			return null
		}

		const normalliedWord = getNormalizeWord(word)

		const response = await createLibraryWord({
			...normalliedWord,
			userID,
		})

		if (response === null) {
			return null
		}

		return response
	}

	return {
		onSubmit,
		words,
		isLoading,
		userID,
	};
}
 
export default useCreateWord;