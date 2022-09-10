import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"

import EmptyContent from "./partials/EmptyContent"
import useLibrary from "./hooks/useLibrary"
import {
  getWords,
  getPinWords,
} from "services/library/Library.store"
import Words from "./partials/Words"
import { getLoading } from "services/loading/Loading.store"
import Spin from "components/spin"
import ErrorContent from "./partials/ErrorContent"
import CreateWord from "./partials/CreateWord"
import Skeleton from "components/Skeleton"

const Search = lazy(() => import('./partials/Search'))

const Library = () => {
  const isFetched = useSelector(getLoading).getLibraryWords?.isFetched
  const isError = useSelector(getLoading).getLibraryWords?.isError
  const pinedWords = useSelector(getPinWords)
  const words = useSelector(getWords)
  const hasWords = !!words.length

  console.log(pinedWords)

  const {
    formattedWords,
    value,
    handleChangeValue,
  } = useLibrary()

  if (!isFetched) {
    return (
      <div className="flex justify-center items-center w-screen h-screen" >
        <Spin
          color="indigo"
          width={90}
          height={90}
        />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorContent />
    )
  }

  if (!hasWords) {
    return (
      <EmptyContent />
    )
  }

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="flex gap-3">
        <Suspense fallback={(
          <Skeleton height={40} />
        )}>
          <Search
            value={value}
            onChange={handleChangeValue}
          />
        </Suspense>
        <CreateWord />
      </div>
      {hasWords && (
        <Words
          pinedWords={pinedWords}
          words={words}
        />
      )}
    </div>
  )
}

export default Library