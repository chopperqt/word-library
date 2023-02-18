
interface UsePagination {
	page: number
	amountOfPages: number
}

export const usePagination = ({
	page,
	amountOfPages
}:UsePagination) => {
	const isLastPage = page >= amountOfPages

	let from = (page - 1) * 69 + 1

	if (page < 2) {
		from = 0
	}

	const to = page * 69

	return {
		isLastPage,
		from,
		to,
	};
}