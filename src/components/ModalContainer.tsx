import Modal from 'react-modal'

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export interface ModalContainerProps {
  isOpened: boolean,
  onClose: () => void
  children: string | React.ReactNode | React.ReactNode[]
}
const ModalContainer = ({
  isOpened = false,
  onClose,
  children,
}: ModalContainerProps) => (
  <div>
    <Modal
      isOpen={isOpened}
      onRequestClose={onClose}
      style={ModalStyles}
      overlayClassName="bg-black/90 fixed inset-0"
    >
      {children}
    </Modal>

  </div>
)

export default ModalContainer