import React from "react";
import { Button } from "antd";

import WordModal, { useModalWord } from "common/word-modal";
import Icon, { IconsList } from "components/icon/Icon";
import useCreateWord from "pages/library/hooks/useCreateWord";

const ADD_TEXT = "Add";

const CreateWord = () => {
  const { onSubmit, isLoading, userID, words, isDisabledPin, contextHolder } =
    useCreateWord();

  const { handleClose, handleOpen, isOpened, handleSubmit } = useModalWord({
    shouldCloseAfterSubmit: true,
    userID,
    onSubmit,
  });

  return (
    <React.Fragment>
      {contextHolder}
      <Button
        size="large"
        type="primary"
        className="whitespace-nowrap"
        onClick={handleOpen}
      >
        <Icon
          className="block md:hidden fill-white w-5 h-5 hover:fill-white"
          icon={IconsList.plusCircle}
        />
        <div className="hidden md:block">{ADD_TEXT}</div>
      </Button>
      <WordModal
        onSubmit={handleSubmit}
        isOpened={isOpened}
        onClose={handleClose}
        isLoading={isLoading}
        words={words}
        isDisabledPin={isDisabledPin}
      />
    </React.Fragment>
  );
};

export default CreateWord;
