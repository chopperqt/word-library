import { Pined } from "common/word-container";

interface WordProps {
	word: string
	pined: boolean
	onClickPin: (word: string, isPined: boolean) => void
}

export const Word = ({
	word,
	pined,
	onClickPin,
}:WordProps) => {
	return (
		<div>
			<Pined onClick={() => onClickPin(word, pined)} isPined={pined} />
			{word}
		</div>
	);
}