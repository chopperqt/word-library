import { useState } from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import AddWord from './AddWord'

const ADD_TEXT = 'Добавить слово'
const SEARCH_TEXT = 'Search...'

interface SearchProps {
  value: string,
  onChange: () => void
}
const Search = ({
  value,
  onChange,
}: SearchProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleClose = () => {
    setOpened(false)
  }

  const handleOpen = () => [
    setOpened(true)
  ]

  return (
    <form className='flex items-center gap-5'>
      <Input
        value={value}
        onChange={onChange}
        placeholder={SEARCH_TEXT}
      />
      <Button
        onClick={handleOpen}
        type='button'
        className='whitespace-nowrap'
      >
        {ADD_TEXT}
      </Button>
      <AddWord
        isOpened={isOpened}
        onClose={handleClose}
      />
    </form>
  )
}

export default Search