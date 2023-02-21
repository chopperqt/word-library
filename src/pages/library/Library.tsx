import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import EmptyContent from "./partials/EmptyContent";
import useLibrary from "./hooks/useLibrary";
import { getWords } from "services/library/Library.store";
import Words from "./components/words";
import { getLoading } from "services/loading/Loading.store";
import { getUserID } from "services/user/User.store";
import ErrorContent from "./partials/ErrorContent";
import CreateWord from "./partials/CreateWord";
import Skeleton from "components/Skeleton";
import Spin from "components/spin";
import Preloader from "./partials/Preloader";
import supabase from "api/client";
import Logout from "./partials/Logout";
import WordsPined from "./components/wordsPined";
import Button from "components/button";

const Search = lazy(() => import("./components/search"));

const BUTTON_TEXT = 'More...'

const Library = () => {
  const words = useSelector(getWords);
  const userID = useSelector(getUserID);
  const isFetched = useSelector(getLoading).getLibraryWords?.isFetched;
  const isError = useSelector(getLoading).getLibraryWords?.isError;
  const isLoading = useSelector(getLoading).getLibraryWords?.isLoading;
  const user = supabase?.auth?.user();
  const hasWords = !!words.length;

  const { isLastPage, handleGetMoreWords } =
    useLibrary({
      userID,
      words,
      isFetched,
      isLoading,
    });

  if (!isFetched) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Spin color="indigo" width={90} height={90} />
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
        <div className="flex gap-3">
          {user?.id && <Logout />}
          <Suspense fallback={<Skeleton height={40} />}>
            <Search />
          </Suspense>
          <CreateWord />
        </div>
        <WordsPined />
        <Words />
      </div>
      {!isLastPage && (
        <div className="w-full h-[100px] flex items-center justify-center">
          <Button onClick={handleGetMoreWords} loading={isLoading}>
            {BUTTON_TEXT}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Library;
