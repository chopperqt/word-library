import React from "react"
import { useSelector } from "react-redux"

import Button from "components/button"
import { getUserID } from "services/user/User.store"
import WordModal, { useModalWord } from "common/word-modal"

const ADD_TEXT = 'Add'

const CreateWord = () => {
  const userID = useSelector(getUserID)
  const {
    handleClose,
    handleOpen,
    isOpened,
  } = useModalWord({
    userID
  })

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