import React from "react";
import css from "../../assets/Signup.module.scss";
import {
  ButtonField,
  Form,
  InputField,
  Validation,
} from "../../components/Form/Form";
import Logo from "../../components/icons/Logo.png";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdatePassword } from "./resetSlice";
const ResetPass = ({ text, token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValue = {
    password: "",
  };
  const validation = {
    password: Validation({ name: "password", min: 8 }),
  };
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      if (!token) return navigate("/auth", { replace: true });
      const payload = {
        body: {
          password: values.password,
        },
        token,
      };
      dispatch(UpdatePassword(payload));
      actions.setSubmitting(false);
    }, 1000);
  };
  return (
    <div className={css.auth_form}>
      <Form
        initialValues={initialValue}
        validation={validation}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <div className={css.auth_form_header}>
              <div className={css.auth_form_header_logo}>
                <img src={Logo} alt="CateNote Logo" />
                <h1>CateNote</h1>
              </div>

              <div className={css.auth_form_header_text}>
                {text && <span>{text}</span>}
              </div>
            </div>
            <InputField
              classname={css.formGroup}
              className={`${css.formGroup_input} ${
                formik.errors["password"] ? css.formGroup_input_err : ""
              }`}
              formik={formik}
              placeholder="Password"
              label="Password"
              name={"password"}
            />

            <ButtonField
              className={`${css.formGroup_btn} ${
                formik.isSubmitting && css.formGroup_btn_disable
              }`}
              classname={css.formGroup}
              formik={formik}
            >
              Submit
            </ButtonField>
          </>
        )}
      </Form>
    </div>
  );
};

export default ResetPass;
