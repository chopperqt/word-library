import AgreementModal, { useAgreementModal } from "common/agreement-modal"
import Icon, { IconsList } from "components/icon/Icon"

import type { Word } from "models/Library.models"

interface DeleteProps {
  isLoading?:boolean
  onClick: () => Promise<Word[] | null>
}
const Delete = ({
  isLoading = false,
  onClick,
}: DeleteProps) => {
  const {
    handleClose,
    handleOpen,
    isOpened,
  } = useAgreementModal()

  const handleDelete = async () => {
    const response = await onClick()

    if (response === null) {
      return
    }

    handleClose()
  }

  return (
    <>
      <button
        onClick={handleOpen}
        type="button"
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