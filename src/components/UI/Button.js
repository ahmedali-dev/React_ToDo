import React, { useRef } from "react";

const Button = React.forwardRef(({ text, classname, ...props }, ref) => {
  return (
    <div className={classname}>
      <button {...props} ref={ref}>
        {props.children}
      </button>
    </div>
  );
});

export default Button;
