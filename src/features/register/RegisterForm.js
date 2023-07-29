import React from "react";
import {
  InputField,
  Form,
  Validation,
  ButtonField,
} from "../../components/Form/Form";
import css from "../../assets/Signup.module.scss";
import Logo from "../../components/icons/Logo.png";
import { Link } from "react-router-dom";
const RegisterForm = ({ text, RegisterHandle }) => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const validation = {
    name: Validation({ name: "name", min: 8 }),
    email: Validation({ name: "email", type: "email" }),
    password: Validation({ name: "password", min: 8 }),
  };

  const onSubmit = RegisterHandle;

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
                  formik.errors["name"] ? css.formGroup_input_err : ""
                }`}
                formik={formik}
                placeholder="Name"
                label="Name"
                name={"name"}
              />

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
                Log In
              </ButtonField>

              <div className={css.formGroup}>
                <Link className={css.formGroup_redir} to={"/auth"}>
                  You have <span>Account!</span>
                </Link>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default RegisterForm;
