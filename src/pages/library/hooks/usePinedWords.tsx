import { getLibraryPinWords, updatePin } from "api/library.api";
import { Word } from "models/Library.models";
import { useState } from "react";

interface UsePinedWords {
  words: Word[];
  userId: string;
}

export const usePinedWords = ({ words = [], userId }: UsePinedWords) => {
  const [isLoading, setLoading] = useState(false);

  const handleUnpendWords = async () => {
    const deletedWords = words.map(({ word }) => {
      return updatePin(userId, false, word);
    });

    setLoading(true);

    try {
      await Promise.all(deletedWords);
    } catch (e) {
      setLoading(false);
    }

    await getLibraryPinWords(userId);

    setLoading(false);
  };

  return {
    handleUnpendWords,
    isLoading,
  };
};
