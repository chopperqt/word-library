import Icon, { IconsList } from "components/icon/Icon";

const ResetPin = () => {
  return (
    <>
      <button className="flex items-center ml-2 h-full w-full mt-1">
        <Icon icon={IconsList.refresh} />
      </button>
    </>
  );
}

export default ResetPin;