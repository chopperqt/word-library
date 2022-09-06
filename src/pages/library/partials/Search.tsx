import { ChangeEvent, useState } from 'react'

import Button from 'components/button'
import Input from 'components/Input'
import WordModal from 'components/word-modal/WordModal'

const ADD_TEXT = 'Добавить слово'
const SEARCH_TEXT = 'Search...'

interface SearchProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
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
        name="search"
      />
      <Button
        onClick={handleOpen}
        type='button'
        className='whitespace-nowrap'
      >
        {ADD_TEXT}
      </Button>

      <WordModal
        isOpened={isOpened}
        onClose={handleClose}
      />
    </form>
  )
}

export default Search