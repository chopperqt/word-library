import Search from "./partials/Search"
import Words from "./partials/Words"
import useLibrary from "./useLibrary"

const Library = () => {
  const {
    words,
    value,
    handleChangeValue,
  } = useLibrary()

  return (
    <div className="flex flex-col p-5 gap-5">
      <Search
        value={value}
        onChange={handleChangeValue}
      />
      {!!words?.length && (
        <Words words={words} />
      )}
    </div>
  )
}

export default Library