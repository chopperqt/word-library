import { ChangeEvent } from 'react'

import Input from 'components/Input'

const SEARCH_TEXT = 'Search...'

interface SearchProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Search = ({
  value,
  onChange,
}: SearchProps) => (
  <form className='flex items-center w-full'>
    <Input
      value={value}
      onChange={onChange}
      placeholder={SEARCH_TEXT}
      name="search"
    />
  </form>
)

export default Search