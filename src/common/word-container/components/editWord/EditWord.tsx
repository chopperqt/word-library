import { Button } from "antd";
import { useForm } from "react-hook-form";
import { EditOutlined } from "@ant-design/icons";

import WordModal, { useModalWord } from "common/word-modal";
import { getNormalizeOptionWord } from "common/word-modal/helpers/getNormalizeOptionWord";
import { Word, WordForm, WordID } from "models/Library.models";

interface EditProps extends Pick<Word, "word" | "translate" | "pined"> {
  wordID: WordID;
  isLoading: boolean;
  onSubmit: (word: WordForm, wordID?: number) => Promise<Word[] | null>;
  shouldCloseAfterSubmit?: boolean;
}

const Edit = ({
  word,
  translate = [],
  pined = false,
  wordID,
  isLoading = false,
  onSubmit,
  shouldCloseAfterSubmit = true,
}: EditProps) => {
  const {
    control,
    reset,
    handleSubmit: formSubmit,
  } = useForm<WordForm>({
    mode: "onChange",
  });

  const { handleOpen, handleClose, isOpened, handleSubmit } = useModalWord({
    onSubmit,
    wordID,
    reset,
    shouldCloseAfterSubmit,
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        className="mr-1 flex justify-center items-center"
        type="text"
        shape="circle"
        icon={<EditOutlined />}
        size="small"
      />
      <WordModal
        isUpdate={true}
        isOpened={isOpened}
        onClose={handleClose}
        control={control}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        word={word}
        translate={translate.map(getNormalizeOptionWord)}
        pined={pined}
      />
    </>
  );
};

export default Edit;
