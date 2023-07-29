import React from "react";
import {
  Validation,
  Form,
  InputField,
  ButtonField,
} from "../../components/Form/Form";
import css from "../../assets/Signup.module.scss";
import Logo from "../../components/icons/Logo.png";
import { Link } from "react-router-dom";
const VerifyForm = ({ text, verifyHandle }) => {
  const initialValue = {
    code: "",
  };

  const validation = {
    code: Validation({ name: "password", min: 8 }),
  };

  const onSubmit = verifyHandle;

  return (
    <div className={css.auth_form}>
      <Form
        initialValues={initialValue}
        validation={validation}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <>
              <div className={css.auth_form_header}>
                <div className={css.auth_form_header_logo}>
                  <img src={Logo} alt="CateNote Logo" />
                  <h1>CateNote</h1>
                </div>

                <div className={css.auth_form_header_text}>
                  <p>{text}</p>
                </div>
              </div>

              <InputField
                classname={css.formGroup}
                className={`${css.formGroup_input} ${
                  formik.errors["code"] ? css.formGroup_input_err : ""
                }`}
                formik={formik}
                placeholder="Code: ******"
                label="Code"
                name={"code"}
              />

              <div className={css.formGroup}>
                <Link
                  className={css.formGroup_forgetPass}
                  to={"/auth/password_reset"}
                >
                  Forget a <span>password!</span>
                </Link>
              </div>
              <ButtonField
                className={`${css.formGroup_btn} ${
                  formik.isSubmitting && css.formGroup_btn_disable
                }`}
                classname={css.formGroup}
                formik={formik}
              >
                Log In
              </ButtonField>
              <div className={css.formGroup}>
                <Link className={css.formGroup_redir} to={"/register"}>
                  Log IN for <span>Account!</span>
                </Link>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default VerifyForm;
