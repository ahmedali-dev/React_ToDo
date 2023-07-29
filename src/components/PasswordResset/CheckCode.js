import { ButtonField, Form, InputField, Validation } from "../../helper/Form";
import * as yup from "yup";
import style from "./PassowrdResset.module.scss";
const CodeCheck = (props) => {
  const formikValue = {
    initialValues: {
      code: "",
    },
    validation: yup.object({
      code: Validation({ name: "code", min: 3, max: 32 }),
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
        onSubmit={props.CodeCheck}
      >
        {(formik) => {
          return (
            <>
              <h1>Find your Cate Note account</h1>
              <p>Enter the securty code can you find the code in the email</p>
              <InputField
                classname={css("form_input")}
                formik={formik}
                name="code"
                placeholder="code"
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

export default CodeCheck;
