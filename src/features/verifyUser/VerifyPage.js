import React, { useEffect } from "react";
import css from "../../assets/Signup.module.scss";
import VerifyForm from "./VerifyForm";
import { useDispatch, useSelector } from "react-redux";
import { RegisterSelect } from "../register/registerSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectLogin } from "../login/loginSlice";
import { toast } from "react-hot-toast";
import { Verify, selectVerify } from "./verifySlice";
import useAuth from "../../hooks/useAuth";
const VerifyPage = () => {
  const { login } = useAuth();

  const { verifyToken: verifyTokenLogin } = useSelector(selectLogin);
  const { verifyToken } = useSelector(RegisterSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(verifyToken, "\n\n", verifyTokenLogin);
    if (!verifyToken && !verifyTokenLogin) {
      return navigate("/auth", { replace: true });
    }

    // Cleanup function
    return () => {
      // Perform any necessary cleanup here
      console.log("clean");
      // This will be executed when the component unmounts or when the [dispatch] dependency changes
    };
  }, []);

  const canSave = [verifyToken, verifyTokenLogin].some(Boolean);
  const verifyHandle = (values, actions) => {
    if (!canSave) return toast.error("error actions");
    let token = verifyToken ? verifyToken : verifyTokenLogin;

    const payload = {
      code: values.code,
      token,
      login,
    };

    dispatch(Verify(payload));
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  };
  return (
    <div className={css.auth}>
      <div className={css.auth_ball}></div>
      <div className={css.auth_ball}></div>

      <VerifyForm
        verifyHandle={verifyHandle}
        text={`Thank you for choosing CateNote
        We appreciate your effort to verify your account.
        Account verification is an essential step to ensure the security and authenticity of our platform. 
        To complete the verification process,
        please enter the verification code provided to you`}
      />
    </div>
  );
};

export default VerifyPage;
