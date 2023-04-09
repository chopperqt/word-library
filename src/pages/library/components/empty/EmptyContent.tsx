import { useForm } from "react-hook-form";

import Button from "components/button";
import WordModal, { useModalWord } from "common/word-modal";
import Preloader from "../../partials/Preloader";
import { WordForm } from "models/Library.models";
import useEmpty from "pages/library/hooks/useEmpty";

const NO_WORDS_TEXT = "Welcome to the Word Library";
const DESCRIPTION_TEXT = "Add your first word";
const ADD_TEXT = "Add word";

const Empty = () => {
  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm<WordForm>({
    mode: "onChange",
  });

  const { userID, isLoading, onSubmit } = useEmpty();

  const { isOpened, handleClose, handleOpen, handleSubmit } = useModalWord({
    userID,
    reset,
    onSubmit,
  });

  return (
    <div className="w-screen h-screen flex flex-col  justify-center items-center">
      {isLoading && <Preloader />}
      <div className="text-2xl font-bold text-gray-800">{NO_WORDS_TEXT}</div>
      <div className="text-xl text-gray-800 mt-3">{DESCRIPTION_TEXT}</div>
      <Button className="mt-10" onClick={handleOpen}>
        {ADD_TEXT}
      </Button>
      <WordModal
        control={control}
        onSubmit={handleSubmit}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </div>
  );
};

export default Empty;
