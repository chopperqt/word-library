import { useRef } from "react";
import { Typography } from "antd";
import { CellMeasurerCache, List, CellMeasurer } from "react-virtualized";

import Edit from "./components/editWord/EditWord";
import Pined from "./partials/Pined";
import Delete from "./partials/Delete";
import ExtraWords from "./partials/ExtraWords";

import type { Word, WordForm } from "models/Library.models";

const { Text } = Typography;
interface WordsContainerProps {
  amountOfWords: number;
  words: Word[];
  letter: string;
  color?: string;
  onClickPin: (word: string, isPined: boolean) => void;
  onSubmitUpdate: (word: WordForm, wordID?: number) => Promise<Word[] | null>;
  onClickDelete: (word: string) => Promise<Word[] | null>;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  isDisabledPin: boolean;
}
const WordsContainer = ({
  amountOfWords,
  words = [],
  letter,
  color = "bg-sky-700",
  onClickPin,
  onSubmitUpdate,
  onClickDelete,
  isLoadingUpdate = false,
  isLoadingDelete = false,
  isDisabledPin = false,
}: WordsContainerProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const wrapperWidth = wrapRef.current?.clientWidth;
  const hasWrapperWidth = !!wrapperWidth && wrapperWidth > 0;
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 24,
      fixedWidth: true,
    })
  );

  if (!words.length) {
    return null;
  }

  return (
    <div
      ref={wrapRef}
      className="flex flex-col bg-white rounded-b-md shadow-md mb-3 break-inside-avoid-column"
    >
      <>
        <div className={`text-lg px-5 py-1 ${color} rounded-t-md`}>
          <div className="flex gap-1 justify-center color text-white">
            <div>{letter.toUpperCase()}</div>
            <div>({amountOfWords})</div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-gray-50" />
        {hasWrapperWidth && words.length > 13 && (
          <List
            height={300}
            rowCount={words.length}
            rowHeight={cache.current.rowHeight}
            width={wrapperWidth || 0}
            deferredMeasurementCache={cache.current}
            className="px-5 py-1"
            rowRenderer={({ key, index, style, parent }) => {
              const { word: wordName, translate, id, pined } = words[index];

              return (
                <CellMeasurer
                  key={key}
                  index={index}
                  cache={cache.current}
                  parent={parent}
                  style={style}
                >
                  <div key={key} style={style} className="flex items-center">
                    <div className="flex">
                      <Pined
                        onClick={() => onClickPin(wordName, pined)}
                        isPined={pined}
                        isDisabled={isDisabledPin}
                      />
                      <Edit
                        onSubmit={onSubmitUpdate}
                        wordID={id}
                        word={wordName}
                        translate={translate}
                        pined={pined}
                        isLoading={isLoadingUpdate}
                      />
                      <Delete
                        onClick={() => onClickDelete(wordName)}
                        isLoading={isLoadingDelete}
                      />
                    </div>

                    <Text className="flex">
                      {wordName}&nbsp;—&nbsp;
                      {!!translate?.[0] && translate[0]}
                      {translate?.length > 1 && (
                        <ExtraWords words={translate} />
                      )}
                    </Text>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </>
      {words.length <= 13 && (
        <div className="px-5 py-1">
          {words.map((word) => {
            const { word: wordName, translate, id, pined } = word;

            return (
              <div key={id} className="flex items-center">
                <div className="flex">
                  <Pined
                    onClick={() => onClickPin(wordName, pined)}
                    isPined={pined}
                    isDisabled={isDisabledPin}
                  />
                  <Edit
                    onSubmit={onSubmitUpdate}
                    wordID={id}
                    word={wordName}
                    translate={translate}
                    pined={pined}
                    isLoading={isLoadingUpdate}
                  />
                  <Delete
                    onClick={() => onClickDelete(wordName)}
                    isLoading={isLoadingDelete}
                  />
                </div>
                <Text className="flex">
                  {wordName}&nbsp;—&nbsp;
                  {!!translate?.[0] && translate[0]}
                  {translate?.length > 1 && <ExtraWords words={translate} />}
                </Text>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WordsContainer;
