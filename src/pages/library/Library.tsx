import EmptyWords from "./partials/EmptyWords"
import Search from "./partials/Search"
import Words from "./partials/Words"
import useLibrary from "./hooks/useLibrary"

const Library = () => {
  const {
    formattedWords,
    pinedWords,
    value,
    handleChangeValue,
  } = useLibrary()

  if (!formattedWords.length) {
    return (
      <EmptyWords />
    )
  }

  return (
    <div className="flex flex-col p-5 gap-5">
      <Search
        value={value}
        onChange={handleChangeValue}
      />
      {/* {!!words?.length && (
        <Words
          pinedWords={pinedWords}
          words={words}
        />
      )} */}
    </div>
  )
}

export default Library