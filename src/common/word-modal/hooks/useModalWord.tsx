import { useEffect, useState } from "react";

import type { Word, WordForm, WordID } from "models/Library.models";
import type { UserID } from "models/Auth.models";

interface UseModalWordProps {
  wordID?: WordID;
  userID?: UserID;
  reset?: () => void;
  onSubmit: (word: WordForm, wordID?: number) => Promise<Word[] | null>;
  shouldCloseAfterSubmit?: boolean;
}
const useModalWord = ({
  wordID,
  reset = () => {},
  onSubmit,
  shouldCloseAfterSubmit,
}: UseModalWordProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);

  const handleClose = async () => {
    setOpened(false);
  };

  const handleOpen = () => {
    setOpened(true);
  };

  const handleSubmit = async (word: WordForm) => {
    const response = await onSubmit(word, wordID);

    if (response === null) {
      return;
    }

    if (!shouldCloseAfterSubmit) {
      return;
    }

    handleClose();
  };

  useEffect(() => {
    if (isOpened) {
      return;
    }

    reset();
  }, [reset, isOpened]);

  return {
    isOpened,
    handleClose,
    handleOpen,
    handleSubmit,
  };
};

export default useModalWord;
