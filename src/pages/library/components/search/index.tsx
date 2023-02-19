import Input from "components/Input";
import useSearch from "pages/library/hooks/useSearch";

const SEARCH_STYLES = 'w-full absolute top-[45px] rounded-sm bg-white p-1'
const SEARCH_TEXT = '🔍 Search...'

const Search = () => {
	const { handleChangeValue, value, isLoading } = useSearch()

	return (
		<form className='flex items-center w-full relative'>
    <Input
      value={value}
      onChange={(e) => handleChangeValue(e.target.value)}
      placeholder={SEARCH_TEXT}
      name="search"
      isLoading={isLoading}
    />
    <div className={SEARCH_STYLES}>
    </div>
  </form>
	);
}
 
export default Search;