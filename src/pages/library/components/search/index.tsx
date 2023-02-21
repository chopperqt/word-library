import Input from "components/Input";
import useSearch from "pages/library/hooks/useSearch";
import { Word } from "./partials/Word";

const SEARCH_STYLES = 'w-full absolute top-[45px] rounded-sm bg-white p-1'
const SEARCH_TEXT = '🔍 Search...'

const Search = () => {
	const { handleChangeValue, value, isLoading, isShowSearchedWord, searchWords, handleClickPin } = useSearch()

	return (
		<form className='flex items-center w-full relative'>
    <Input
      value={value}
      onChange={(e) => handleChangeValue(e.target.value)}
      placeholder={SEARCH_TEXT}
      name="search"
      isLoading={isLoading}
    />
    {isShowSearchedWord && (
      <div className={SEARCH_STYLES}>
        {searchWords.map(({pined, word }) => (
          <Word 
            onClickPin={handleClickPin} 
            word={word} 
            pined={pined} 
          />
        ))}
      </div>
    )}
    
  </form>
	);
}
 
export default Search;