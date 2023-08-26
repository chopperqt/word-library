import { updatePin } from "api/library.api";
import { Word } from "models/Library.models";

interface UsePinedWords {
  words: Word[];
  userId: string;
}

export const usePinedWords = ({ words = [], userId }: UsePinedWords) => {
  const handleUnpendWords = () => {
    words.map(({ word }) => {
      updatePin(userId, false, word);
    });
  };

  return {
    handleUnpendWords,
  };
};
