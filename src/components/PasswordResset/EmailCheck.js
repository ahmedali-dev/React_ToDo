import { ButtonField, Form, InputField, Validation } from "../../helper/Form";
import * as yup from "yup";
import style from "./PassowrdResset.module.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const EmailCheck = (props) => {
  const nav = useNavigate();

  const formikValue = {
    initialValues: {
      email: "",
    },
    validation: yup.object({
      email: Validation({ name: "email", type: "email", min: 3, max: 32 }),
    }),
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      console.log(values);
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
    },
  };

  const css = (n) => (n ? style[`PassResset_${n}`] : style.PassResset);
  return (
    <div className={css()}>
      <Form
        className={css("form")}
        initialValues={formikValue.initialValues}
        validation={formikValue.validation}
        onSubmit={props.EmailCheck}
      >
        {(formik) => {
          return (
            <>
              <h1>Find your Cate Note account</h1>
              <p>
                Enter the email associated with your account to change your
                password
              </p>
              <InputField
                classname={css("form_input")}
                formik={formik}
                name="email"
                placeholder="email"
                type={"email"}
              />
              <ButtonField classname={css("form_btn")} formik={formik}>
                Next
              </ButtonField>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default EmailCheck;
