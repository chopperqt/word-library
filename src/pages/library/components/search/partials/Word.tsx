import { Pined, Edit, Delete } from "common/word-container";
import type { Word as IWord, WordForm } from "models/Library.models";

interface WordProps {
	word: string
	pined: boolean
	onClickPin: (word: string, isPined: boolean) => void
	onSubmitUpdate: (word:WordForm, wordID:number) => Promise<IWord[] | null>
	isLoadingUpdate?:boolean
	wordID: number
	translate: string[]
}

export const Word = ({
	word,
	pined,
	onClickPin,
	onSubmitUpdate,
	isLoadingUpdate = false,
	wordID,
	translate
}:WordProps) => {
	return (
		<div>
			<Pined onClick={() => onClickPin(word, pined)} isPined={pined} />
			<Edit 
				word={word}
				onSubmit={onSubmitUpdate} 
				wordID={wordID} 
				isLoading={isLoadingUpdate} 
				translate={translate}
				pined={pined}
				shouldCloseAfterSubmit={true}
			/>
			<Delete />
			{word}
		</div>
	);
}