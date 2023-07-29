import React, { useEffect } from "react";
import RegisterForm from "./RegisterForm";
import css from "../../assets/Signup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewUser, RegisterSelect } from "./registerSlice";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const { status } = useSelector(RegisterSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RegisterHandle = (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      body: {
        ...values,
      },
      setInputError: actions.setFieldError,
    };

    dispatch(CreateNewUser(payload));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (status === "succeeded") {
      return navigate("/verifyUser?a=r");
    }
  }, []);

  return (
    <div className={css.auth}>
      <div className={css.auth_ball}></div>
      <div className={css.auth_ball}></div>

      <RegisterForm
        RegisterHandle={RegisterHandle}
        text={`Welcome to CateNote!
                Congratulations on becoming a part of our community. 
                We're thrilled to have you onboard and look forward to providing you with a fantastic experience`}
      />
    </div>
  );
};

export default RegisterPage;
