import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const ResetPin = () => {
  return (
    <>
      <Button
        className="flex items-center justify-center ml-2"
        shape="circle"
        type="ghost"
        icon={<ReloadOutlined />}
      />
    </>
  );
};

export default ResetPin;
