import React from "react";
import css from "./styles.module.scss";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Navigate, useNavigate } from "react-router-dom";
import { Add, Back, Delete } from "../icons/icons";
import Button from "./Button";
import Input from "./Input";

const Card = ({
  id,
  title,
  body,
  date,
  progress,
  progressCount,
  popup,
  backPath,
  ...props
}) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = React.useState(false);

  if (popup) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  return (
    <>
      {popup && (
        <div
          className={css.mask}
          onClick={() => {
            return backPath ? navigate(`${backPath}`) : null;
          }}
        ></div>
      )}
      <div {...props} className={`${css.card} ${popup && css.card_popup}`}>
        {popup && (
          <div className={css.card_top}>
            <div
              className={css.back}
              onClick={() => {
                return backPath ? navigate(`${backPath}`) : null;
              }}
            >
              <Back />
            </div>
            <div className={css.delete}>
              <Delete />
            </div>
          </div>
        )}

        <div className={css.card_title}>
          <h2>{title}</h2>
        </div>
        <div className={css.card_date}>
          <small>{date}</small>
        </div>

        {progress && (
          <div className={css.card_progress}>
            <p>{progressCount}</p>
            <div className={css.card_progress_content}>
              <span className={css.down}></span>
              <span
                style={{ width: `${progress()}` }}
                className={css.up}
              ></span>
            </div>
          </div>
        )}

        {popup && (
          <div className={css.card_add}>
            <Input
              classname={`${css.card_add_form} ${
                showForm && css.card_add_form_active
              }`}
              type={"text"}
              placeholder={"Task..."}
            />

            <Button
              classname={`${css.card_add_btn} ${
                showForm && css.card_add_btn_active
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              <Add />
            </Button>
          </div>
        )}

        <div className={css.card_body}>{body}</div>
      </div>
    </>
  );
};

// <SyntaxHighlighter
//           language="auto"
//           style={tomorrow}
//           customStyle={{ tabSize: 3 }}
//         >
//           {body}
//         </SyntaxHighlighter>
export default Card;
