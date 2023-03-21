import { useNavigate } from "react-router-dom";

export const useHome = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/signIn");
  };

  return {
    handleClickButton,
  };
};
