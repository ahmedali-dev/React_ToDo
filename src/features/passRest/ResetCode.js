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
import { CheckCode } from "./resetSlice";
const ResetCode = ({ text, email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValue = {
    code: "",
  };
  const validation = {
    code: Validation({ name: "code", min: 5 }),
  };
  const onSubmit = (values, actions) => {
    setTimeout(() => {
      console.log(email);
      if (!email) return navigate("/password_reset", { replace: true });

      const payload = {
        body: {
          email,
          code: values.code,
        },
      };

      dispatch(CheckCode(payload));
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
                formik.errors["code"] ? css.formGroup_input_err : ""
              }`}
              formik={formik}
              placeholder="Code"
              label="Code"
              name={"code"}
            />

            <ButtonField
              className={`${css.formGroup_btn} ${
                formik.isSubmitting && css.formGroup_btn_disable
              }`}
              classname={css.formGroup}
              formik={formik}
            >
              Verify
            </ButtonField>
          </>
        )}
      </Form>
    </div>
  );
};

export default ResetCode;
