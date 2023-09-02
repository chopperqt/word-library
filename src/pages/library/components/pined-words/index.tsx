import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Button, Typography, message } from "antd";

import WordsContainer from "common/word-container/WordsContainer";
import { useWords } from "pages/library/hooks/useWords";
import { getPinWords } from "services/library/Library.store";
import { getUserID } from "services/user/User.store";
import { usePinedWords } from "pages/library/hooks/usePinedWords";

const { Title } = Typography;

const PinedWords = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const userId = useSelector(getUserID);
  const words = useSelector(getPinWords);

  const { handleUnpendWords, isLoading } = usePinedWords({
    words,
    userId,
    messageApi,
  });

  const {
    normalizedWords,
    handleClickPin,
    handleClickDelete,
    handleSubmitUpdate,
    isLoadingDelete,
    isLoadingUpdate,
    isDisabledPin,
  } = useWords({
    words,
  });

  if (!words.length) {
    return null;
  }

  const title = `Pined(${words.length}/15)`;

  return (
    <div className="p-[15px] rounded-lg bg-slate-100">
      {contextHolder}
      <div className="flex items-center">
        <Title level={3} className="mb-0">
          {title}
        </Title>
        <Button
          className="flex mb-[10px] items-center justify-center ml-2"
          type="primary"
          icon={<DeleteOutlined />}
          onClick={handleUnpendWords}
          loading={isLoading}
          danger
        />
      </div>
      <div className="flex justify-start items-start gap-3 flex-wrap">
        {Object.entries(normalizedWords).map(
          ([key, words]: [key: string, words: any]) => {
            const amountOfWords = words[1].length;

            if (!amountOfWords) {
              return null;
            }

            const [letter, word] = words;

            return (
              <WordsContainer
                key={key}
                onClickDelete={handleClickDelete}
                onSubmitUpdate={handleSubmitUpdate}
                onClickPin={handleClickPin}
                letter={letter}
                amountOfWords={amountOfWords}
                words={word}
                color="bg-indigo-700"
                isLoadingDelete={!!isLoadingDelete}
                isLoadingUpdate={!!isLoadingUpdate}
                isDisabledPin={isDisabledPin}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default PinedWords;
