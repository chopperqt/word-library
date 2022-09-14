import { useDispatch } from "react-redux";

import { logOut } from "api/auth.api";
import Icon, { IconsList } from "components/icon/Icon";
import { clearUser } from "services/user/User.store";
import AgreementModal, { useAgreementModal } from "common/agreement-modal";

const Logout = () => {
  const dispatch = useDispatch()

  const {
    handleClose,
    handleOpen,
    isOpened,
  } = useAgreementModal()

  const handleLogout = async () => {
    const response = await logOut()

    if (response) {
      return
    }

    dispatch(clearUser())
  }

  return (
    <>
      <button
        className="text-black right-10 bottom-10 text-xl"
        onClick={handleOpen}
      >
        <Icon icon={IconsList.logout} />
      </button>
      <AgreementModal
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleLogout}
      />
    </>
  );
}

export default Logout;
