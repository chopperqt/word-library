import { useDispatch } from "react-redux";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { logOut } from "api/auth.api";
import { clearUser } from "services/user/User.store";
import { ConfirmationModal } from "common/confirmation-modal";
import { useModal } from "helpers/useModal";
import { bc } from "App";

const CONFIRMATION_TEXT = "Are you sure you want to do this?";
const ACCEPT_TEXT = "Logout";
const CANCEL_TEXT = "Cancel";

const Logout = () => {
  const dispatch = useDispatch();

  const { handleClose, handleOpen, isOpened } = useModal();

  const handleLogout = async () => {
    const response = await logOut();

    if (response) {
      return;
    }

    bc.postMessage({
      isLogout: true,
    });

    dispatch(clearUser());
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center justify-center"
        size="large"
        type="primary"
        danger
        icon={<LogoutOutlined />}
      />
      <ConfirmationModal
        text={CONFIRMATION_TEXT}
        textAccept={ACCEPT_TEXT}
        textCancel={CANCEL_TEXT}
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleLogout}
      />
    </>
  );
};

export default Logout;
