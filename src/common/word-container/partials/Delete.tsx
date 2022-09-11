import {
  deleteLibraryWords,
  getLibraryWords,
} from "api/library.api"
import AgreementModal, { useAgreementModal } from "common/agreement-modal"
import Icon, { IconsList } from "components/icon/Icon"

import type { UserID } from "models/Auth.models"
import { useSelector } from "react-redux"
import { getLoading } from "services/loading/Loading.store"

interface DeleteProps {
  userID: UserID
  word: string
}
const Delete = ({
  userID,
  word,
}: DeleteProps) => {
  const isLoading = useSelector(getLoading).deleteLibraryWords?.isLoading
  const {
    handleClose,
    handleOpen,
    isOpened,
  } = useAgreementModal()

  const handleDelete = async () => {
    const response = await deleteLibraryWords(userID, word)

    if (response === null) {
      return
    }

    handleClose()

    await getLibraryWords(userID)
  }

  return (
    <>
      <button
        onClick={handleOpen}
      >
        <Icon
          icon={IconsList.cross}
          className="w-3 h-3 mr-2"
        />
      </button>
      <AgreementModal
        isLoading={isLoading}
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleDelete}
      />
    </>
  )
}

export default Delete