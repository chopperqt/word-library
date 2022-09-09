import { useEffect } from "react"

import EmptyWords from "./partials/EmptyWords"
import Search from "./partials/Search"
import useLibrary from "./hooks/useLibrary"
import { useSelector } from "react-redux"
import {
  getWords,
  getPinWords,
} from "services/library/Library.store"
import Words from "./partials/Words"
import { getLibraryWords } from "api/library.api"

const Library = () => {
  const words = useSelector(getWords)
  const pinedWords = useSelector(getPinWords)
  const {
    formattedWords,
    value,
    handleChangeValue,
  } = useLibrary()

  // if (!formattedWords.length) {
  //   return (
  //     <EmptyWords />
  //   )
  // }

  console.log('words', words)

  return (
    <div className="flex flex-col p-5 gap-5">
      {/* <Search
        value={value}
        onChange={handleChangeValue}
      /> */}
      {!!words?.length && (
        <Words
          //pinedWords={pinedWords}
          words={words}
        />
      )}
    </div>
  )
}

export default Library