import Input from "components/Input";
import useSearch from "pages/library/hooks/useSearch";

const SEARCH_TEXT = '🔍 Search...'

const Search = () => {
	const { handleChangeValue, value } = useSearch()

	return (
		<form className='flex items-center w-full'>
    <Input
      value={value}
      onChange={(e) => handleChangeValue(e.target.value)}
      placeholder={SEARCH_TEXT}
      name="search"
    />
  </form>
	);
}
 
export default Search;