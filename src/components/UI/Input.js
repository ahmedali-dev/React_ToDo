import React, { useRef } from "react";

const Input = React.forwardRef(
  ({ id, label, error, classname, ...props }, ref) => {
    return (
      <div className={classname}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} ref={ref} />
        <p>{error}</p>
      </div>
    );
  }
);

export const InputBefore = React.forwardRef(
  ({ id, label, error, classname, ...props }, ref) => {
    return (
      <div className={classname}>
        <input id={id} {...props} ref={ref} />
        <label htmlFor={id}>{label}</label>
        <p>{error}</p>
      </div>
    );
  }
);

export default Input;
