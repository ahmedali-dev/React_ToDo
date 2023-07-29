import Cookies from "js-cookie";
import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const initialToken = Cookies.get("access_token");
  const [token, setToken] = useState(initialToken);

  const userIsLogin = !!token;

  const loginHandler = (token) => {
    setToken(token);

    Cookies.set("access_token", token, {
      expires: 30,
      secure: true,
      sameSite: "strict",
    });
  };

  const logoutHandler = () => {
    setToken(null);
    window.location.reload();
    Cookies.remove("access_token");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLogin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
