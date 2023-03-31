import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

import AgreementModal, { useAgreementModal } from "common/agreement-modal";

import type { Word } from "models/Library.models";

interface DeleteProps {
  isLoading?: boolean;
  onClick: () => Promise<Word[] | null>;
}
const Delete = ({ isLoading = false, onClick }: DeleteProps) => {
  const { handleClose, handleOpen, isOpened } = useAgreementModal();

  const handleDelete = async () => {
    const response = await onClick();

    if (response === null) {
      return;
    }

    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex justify-center items-center"
        type="text"
        size="small"
        shape="circle"
        icon={<DeleteOutlined />}
      />
      <AgreementModal
        isLoading={isLoading}
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleDelete}
      />
    </>
  );
};

export default Delete;
