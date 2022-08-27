import ModalContainer from "components/ModalContainer"
import type { ModalContainerProps } from 'components/ModalContainer'

type AddWordProps = Pick<ModalContainerProps, 'isOpened' | 'onClose'>
const AddWord = ({
  isOpened,
  onClose,
}: AddWordProps) => (
  <ModalContainer
    isOpened={isOpened}
    onClose={onClose}
  >
    Модалочка
  </ModalContainer>
)

export default AddWord