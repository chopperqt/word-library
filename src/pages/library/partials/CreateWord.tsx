import React from "react"
import { useSelector } from "react-redux"

import Button from "components/button"
import { getUserID } from "services/user/User.store"
import useModalWord from '../hooks/useModalWord'
import WordModal from "components/word-modal"

const ADD_TEXT = 'Add'

const CreateWord = () => {
  const userID = useSelector(getUserID)
  const {
    handleClose,
    handleOpen,
    isOpened,
  } = useModalWord()

  return (
    <React.Fragment>
      <Button
        className="whitespace-nowrap"
        onClick={handleOpen}
      >
        {ADD_TEXT}
      </Button>
      <WordModal
        onSubmit={() => { }}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </React.Fragment>
  )
}

export default CreateWord