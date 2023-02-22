import { useSelector } from "react-redux";

import { createLibraryWord, getLibraryWords } from "api/library.api";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import { getUserID } from "services/user/User.store";

import type { Word, WordForm } from "models/Library.models";
import { getLoading } from "services/loading/Loading.store";
import { getOnlyWords } from "services/library/Library.store";
import { usePagination } from "helpers/usePagination";
import { getAmountOfPages, getPage } from "services/pagination/Pagination.store";

const useCreateWord = () => {
	const userID = useSelector(getUserID)
	const isLoading = useSelector(getLoading).createLibraryWord?.isLoading
	const words = useSelector(getOnlyWords)
	const page = useSelector(getPage)
	const amountOfPages = useSelector(getAmountOfPages)

	const {
		to,
	} = usePagination({
		page,
		amountOfPages,
	})

	const onSubmit = async (word:WordForm):Promise<Word[] | null> => {
		if (!userID) {
			return null
		}

		const normalizedWord = getNormalizeWord(word)

		const response = await createLibraryWord({
			...normalizedWord,
			userID,
		})

		if (response === null) {
			return null
		}

		getLibraryWords(userID, 0, to)

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