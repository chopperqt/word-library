import Input from "components/Input";
import useSearch from "pages/library/hooks/useSearch";
import { Word } from "./partials/Word";

const SEARCH_STYLES = 'w-full absolute top-[45px] rounded-sm bg-white p-1'
const SEARCH_TEXT = '🔍 Search...'

const Search = () => {
	const { 
    handleChangeValue, 
    value, 
    isLoading, 
    isShowSearchedWord, 
    searchWords, 
    handleClickPin, 
    handleSubmitUpdate,
    isLoadingUpdate,
  } = useSearch()

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
        {searchWords.map(({pined, word, id, translate }) => (
          <Word 
            wordID={id}
            onClickPin={handleClickPin}
            onSubmitUpdate={handleSubmitUpdate}
            word={word} 
            pined={pined} 
            isLoadingUpdate={isLoadingUpdate}
            translate={translate}
          />
        ))}
      </div>
    )}
    
  </form>
	);
}
 
export default Search;