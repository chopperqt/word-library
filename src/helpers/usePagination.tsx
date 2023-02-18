
interface UsePagination {
	page: number
}

export const usePagination = ({
	page,
}:UsePagination) => {
	let from = (page - 1) * 69 + 1

	if (page < 2) {
		from = 0
	}

	const to = page * 69

	return {
		from,
		to,
	};
}