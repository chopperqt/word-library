import Input from 'components/Input'

interface SearchProps {
  value: string,
  onChange: () => void
}

const SEARCH_TEXT = 'Search...'

const Search = ({
  value,
  onChange,
}: SearchProps) => (
  <form>
    <Input
      value={value}
      onChange={onChange}
      placeholder={SEARCH_TEXT}
    />
  </form>
)

export default Search