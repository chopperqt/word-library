import { Button, Typography } from 'antd'

import { useHome } from "./hooks/useHome";

const { Text } = Typography

const BUTTON_TEXT = 'Try It.'


const Home = () => {
  const { handleClickButton } = useHome();

  return (
    <div className="flex flex-col gap-y-[10px] items-center justify-center w-full h-screen bg-white">
      <Text className="relative text-[30px] sm:text-[60px] lg:text-[72px]">
        A <span className="text-indigo-500">simple</span> word library.
      </Text>

      <Button 
        type="primary" 
        size="large"
        onClick={handleClickButton}
      >
        {BUTTON_TEXT}
      </Button>
      <div className="text-[12px] fixed bottom-[20px]"></div>
    </div>
  );
};

export default Home;
