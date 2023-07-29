import React, { useEffect, useMemo } from "react";
import LoginForm from "./LoginForm";
import css from "../../assets/Signup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthUser, selectLogin } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";
const LoginPage = ({}) => {
  const { status, verifyToken, token } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandle = (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      body: {
        email: values.email,
        password: values.pass,
      },
      login,
    };

    dispatch(AuthUser(payload));
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  };

  useMemo(() => {
    if (status === "idle" && verifyToken) {
      console.log(verifyToken);
      return navigate("/verifyUser?a=l", { replace: true });
    }
  }, [dispatch, verifyToken]);

  // if (status === "succeeded") {
  //   console.log(`%c ${token}`, "color: green");
  //   Cookies.set("access_token", token, {
  //     expires: 7,
  //     secure: true,
  //     sameSite: "strict",
  //     httpOnly: true,
  //   });
  // }
  return (
    <div className={css.auth}>
      <div className={css.auth_ball}></div>
      <div className={css.auth_ball}></div>

      <LoginForm
        loginHandle={loginHandle}
        text={"We're thrilled to have you here again. "}
      />
    </div>
  );
};

export default LoginPage;
