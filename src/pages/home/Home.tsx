import Button from "components/button";

import { useHome } from "./hooks/useHome";

const Home = () => {
  const { handleClickButton } = useHome();

  return (
    <div className="flex flex-col gap-y-[10px] items-center justify-center w-full h-screen bg-white">
      <div className="text-[72px] relative">
        A <span className="text-indigo-500">simple</span> word library.
        <pre className="absolute right-[-55px] bottom-[-20px] text-[14px] text-gray-300 flex">
          Create by{" "}
          <a className="underline" href="/">
            Chopper
          </a>
        </pre>
      </div>

      <Button onClick={handleClickButton}>Try it</Button>
      <div className="text-[12px] fixed bottom-[20px]"></div>
    </div>
  );
};

export default Home;
