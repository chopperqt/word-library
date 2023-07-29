import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Button, Spin } from "antd";

import Skeleton from "components/Skeleton";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";

import EmptyContent from "./components/empty/EmptyContent";
import useLibrary from "./hooks/useLibrary";
import { getWords } from "services/library/Library.store";
import Words from "./components/words";
import ErrorContent from "./partials/ErrorContent";
import Preloader from "./partials/Preloader";
import supabase from "api/client";
import Logout from "./partials/Logout";
import WordsPined from "./components/wordsPined";

const Search = lazy(() => import("./components/search"));
const CreateWord = lazy(() => import("./components/createWord/CreateWord"));

const BUTTON_TEXT = "More...";

export interface LibraryProps {
  initialPage: number;
}

const Library = () => {
  const words = useSelector(getWords);
  const userID = useSelector(getUserID);
  const isFetched = useSelector(getLoading).getLibraryWords?.isFetched;
  const isError = useSelector(getLoading).getLibraryWords?.isError;
  const isLoading = useSelector(getLoading).getLibraryWords?.isLoading;
  const isLoadingMoreWords =
    useSelector(getLoading).getLibraryWordsByPagination?.isLoading;
  const user = supabase?.auth?.user();
  const hasWords = !!words.length;

  const { isLastPage, handleGetMoreWords } = useLibrary({
    userID,
    words,
    isFetched,
    isLoading,
  });

  if (!isFetched) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (!hasWords) {
    return <EmptyContent />;
  }

  return (
    <React.Fragment>
      {isLoading && <Preloader />}
      <div className="flex flex-col p-5 gap-5">
        <div className="flex gap-3 p-[15px] rounded-lg bg-slate-100">
          <Suspense fallback={<Skeleton height={40} />}>
            <Search />
          </Suspense>
          <Suspense fallback={<Skeleton height={40} width={61} />}>
            <CreateWord />
          </Suspense>
          {user?.id && <Logout />}
        </div>
        <WordsPined />
        <Words />
      </div>
      {!isLastPage && (
        <div className="w-full h-[100px] flex items-center justify-center">
          <Button
            onClick={handleGetMoreWords}
            loading={isLoadingMoreWords}
            size="large"
            type="primary"
          >
            {BUTTON_TEXT}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Library;
