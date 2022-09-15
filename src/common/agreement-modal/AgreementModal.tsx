import Button from "components/button"
import ModalContainer from "components/ModalContainer"

const AGREEMENT_TEXT = 'Are you sure?'
const OK_TEXT = 'OK'
const CANCEL_TEXT = 'Cancel'

export interface AgreementModalProps {
  onClick: () => void
  isOpened: boolean
  onClose: () => void
  isLoading?: boolean
}
const AgreementModal = ({
  onClick,
  isOpened,
  onClose,
  isLoading,
}: AgreementModalProps) => (
  <ModalContainer
    isOpened={isOpened}
    onClose={onClose}
  >
    <div data-testid="agreement-content">
      <div className="text-2xl text-center">
        {AGREEMENT_TEXT}
      </div>
      <div className="flex gap-3 mt-5 justify-center">
        <Button
          onClick={onClick}
          loading={isLoading}
        >
          {OK_TEXT}
        </Button>
        <Button onClick={onClose}>
          {CANCEL_TEXT}
        </Button>
      </div>
    </div>
  </ModalContainer>
)

export default AgreementModal