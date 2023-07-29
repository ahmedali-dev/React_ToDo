import { useContext } from "react";
import AuthContext from "../Store/Auth-context";

const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};

export default useAuth;
