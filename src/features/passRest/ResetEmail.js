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
import { useDispatch } from "react-redux";
import { CheckEmail } from "./resetSlice";

const ResetEmail = ({ text }) => {
  const initialValue = {
    email: "",
  };
  const validation = {
    email: Validation({ name: "email", type: "email" }),
  };

  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      const payload = {
        params: {
          email: values.email,
        },
      };
      dispatch(CheckEmail(payload));
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
                formik.errors["email"] ? css.formGroup_input_err : ""
              }`}
              formik={formik}
              placeholder="Email"
              label="Email"
              name={"email"}
            />

            <ButtonField
              className={`${css.formGroup_btn} ${
                formik.isSubmitting && css.formGroup_btn_disable
              }`}
              classname={css.formGroup}
              formik={formik}
            >
              Search
            </ButtonField>
          </>
        )}
      </Form>
    </div>
  );
};

export default ResetEmail;
