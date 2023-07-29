import { Formik } from "formik";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Reload from "../Reloading/Reload";
import * as yup from "yup";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
const Form = (props) => {
  return (
    <>
      <Formik
        initialValues={props.initialValues}
        validationSchema={yup.object(props.validation)}
        onSubmit={props.onSubmit}
      >
        {(formik) => {
          return (
            <>
              <form className={props.className} onSubmit={formik.handleSubmit}>
                {props.children(formik)}
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

let UForm = ({ inputs, button, ...props }) => {
  // const initialValues = props.initialValues;
  // const validation = props.validation;
  // const onSubmit = props.onSubmit;

  return (
    <Form {...props}>
      {(formik) => (
        <>
          {inputs.map((input) => (
            <InputField key={nanoid()} formik={formik} {...input} />
          ))}
        </>
      )}
    </Form>
  );
};

UForm = React.memo(UForm);
const InputField = ({ formik, ...props }) => {
  return (
    <>
      <Input
        {...props}
        {...formik.getFieldProps(props.name)}
        error={
          formik.touched[props.name] && formik.errors[props.name]
            ? formik.errors[props.name]
            : null
        }
      />
    </>
  );
};

const Validation = ({ name = "", type = "", min = 1, max = 32 }) => {
  if (type === "email")
    return yup
      .string()
      .min(min, `${name} Must be ${min} character or larger`)
      .max(max, `${name} Must be ${max} characters or less`)
      .email("Invalid email")
      .required(`${name} is Required`);

  return yup
    .string()
    .min(min, `${name} Must be ${min} character or larger`)
    .max(max, `${name} Must be ${max} characters or less`)
    .required(`${name} is Required`);
};

const ButtonField = ({ formik, loading, ...props }) => (
  <Button {...props} type={"submit"} disabled={formik.isSubmitting}>
    {formik.isSubmitting ? <Reload /> : props.children}
  </Button>
);
export { Form, UForm, InputField, ButtonField, Validation };
