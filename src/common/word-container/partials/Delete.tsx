import {
  deleteLibraryWords,
  getLibraryWords,
} from "api/library.api"
import Icon, { IconsList } from "components/icon/Icon"

import type { UserID } from "models/Auth.models"

interface DeleteProps {
  userID: UserID
  word: string
}
const Delete = ({
  userID,
  word,
}: DeleteProps) => {
  const handleDelete = async () => {
    const response = await deleteLibraryWords(userID, word)

    if (response === null) {
      return
    }

    await getLibraryWords(userID)
  }

  return (
    <button
      onClick={handleDelete}
    >
      <Icon
        icon={IconsList.cross}
        className="w-3 h-3 mr-2"
      />
    </button>
  )
}

export default Delete