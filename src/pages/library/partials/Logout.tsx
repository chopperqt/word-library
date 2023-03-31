import { useDispatch } from "react-redux";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { logOut } from "api/auth.api";
import { clearUser } from "services/user/User.store";
import AgreementModal, { useAgreementModal } from "common/agreement-modal";

const Logout = () => {
  const dispatch = useDispatch();

  const { handleClose, handleOpen, isOpened } = useAgreementModal();

  const handleLogout = async () => {
    const response = await logOut();

    if (response) {
      return;
    }

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
      <AgreementModal
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleLogout}
      />
    </>
  );
};

export default Logout;
