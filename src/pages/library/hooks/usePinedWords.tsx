import { useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";

import {
  getLibraryPinWords,
  getLibraryWords,
  updatePin,
} from "api/library.api";
import { WordApi } from "models/Library.models";
import { ParamsController } from "helpers/paramsController";
import { getPaginationRange } from "helpers/getPaginationRange";

interface UsePinedWords {
  words: WordApi[];
  userId: string;
  messageApi: MessageInstance;
}

export const usePinedWords = ({
  words = [],
  userId,
  messageApi,
}: UsePinedWords) => {
  const { getParam } = ParamsController();

  const [isLoading, setLoading] = useState(false);

  const pageParam = getParam("page");
  const currentPage = pageParam ? +pageParam : 1;

  const handleUnpendWords = async () => {
    const { from, to } = getPaginationRange(currentPage);

    const deletedWords = words.map(({ word }) => {
      return updatePin(userId, false, word);
    });

    setLoading(true);

    messageApi
      .open({
        type: "loading",
        content: "Unpinning ...",
      })
      .then(async () => {
        try {
          await Promise.all(deletedWords);
        } catch (e) {
          setLoading(false);
        }

        await getLibraryPinWords(userId);
        await getLibraryWords({
          userID: userId,
          from,
          to,
          shouldControlPending: false,
        });
      })
      .then(() => {
        message.success("All words were unpin.");
      });

    setLoading(false);
  };

  return {
    handleUnpendWords,
    isLoading,
  };
};
