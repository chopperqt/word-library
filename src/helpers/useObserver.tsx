
interface UseObserver {
	threshold?: number
	callback: () => void
}

export const useObserver = ({
	threshold = 0,
	callback,
}:UseObserver) => {
	const observer = new IntersectionObserver((entry) => {
		if (!entry.length) {
			return
		}

		if (!entry[0].isIntersecting) {
			return
		}

		callback()
	}, {
		threshold,
	})

	return {
		observer,
	};
}