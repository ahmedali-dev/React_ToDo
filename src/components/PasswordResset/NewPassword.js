import { ButtonField, Form, InputField, Validation } from "../../helper/Form";
import * as yup from "yup";
import style from "./PassowrdResset.module.scss";
const NewPassword = (props) => {
  const formikValue = {
    initialValues: {
      Passowrd: "",
      PassowrdCM: "",
    },
    validation: yup.object({
      Passowrd: Validation({ name: "Passowrd", min: 8, max: 32 }),
      PassowrdCM: Validation({ name: "PassowrdCM", min: 8, max: 32 }),
    }),
  };

  const css = (n) => (n ? style[`PassResset_${n}`] : style.PassResset);
  return (
    <div className={css()}>
      <Form
        className={css("form")}
        initialValues={formikValue.initialValues}
        validation={formikValue.validation}
        onSubmit={props.PasswordSubmit}
      >
        {(formik) => {
          return (
            <>
              <h1>Find your Cate Note account</h1>
              <p>Enter the securty code can you find the code in the email</p>
              <InputField
                classname={css("form_input")}
                formik={formik}
                name="Passowrd"
                placeholder="password"
                label={"password"}
                type={"text"}
              />
              <InputField
                classname={css("form_input")}
                formik={formik}
                name="PassowrdCM"
                placeholder="Passowrd Confirmation"
                label="Passowrd Confirmation"
                type={"text"}
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

export default NewPassword;
