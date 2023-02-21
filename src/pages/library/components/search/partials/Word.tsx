import { Pined, Edit, Delete } from "common/word-container";
import ExtraWords from "common/word-container/partials/ExtraWords";

import type { Word as IWord, WordForm } from "models/Library.models";

interface WordProps {
	word: string
	pined: boolean
	onClickPin: (word: string, isPined: boolean) => void
	onClickDelete: (word: string) => Promise<IWord[] | null>
	onSubmitUpdate: (word:WordForm, wordID?:number) => Promise<IWord[] | null>
	isLoadingUpdate?:boolean
	isLoadingDelete?: boolean
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
	translate,
	onClickDelete,
	isLoadingDelete,
}:WordProps) => {
	return (
		<div className="flex">
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
			<Delete 
				onClick={() => onClickDelete(word)}
				isLoading={isLoadingDelete}
			/>
			{word}
			<div>&nbsp;—&nbsp;</div>
			<div className="flex">
        {!!translate?.[0] && translate[0]}
        {translate?.length > 1 && (
          <ExtraWords words={translate} />
        )}
      </div>
		</div>
	);
}