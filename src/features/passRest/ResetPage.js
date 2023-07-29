import React, { useEffect } from "react";
import ResetEmail from "./ResetEmail";
import css from "../../assets/Signup.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetCode from "./ResetCode";
import ResetPass from "./ResetPass";
import { useSelector } from "react-redux";
import { resetSelect } from "./resetSlice";
import { toast } from "react-hot-toast";

const ResetPage = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, error, nextPage, email, token, status } =
    useSelector(resetSelect);

  useEffect(() => {
    if (error) {
      switch (error?.payload?.status) {
        case 404:
          toast.error(error?.payload?.data?.msg);
          break;
        case 401:
          toast.error(error?.payload?.data?.msg);
          return navigate("/auth", { replace: true });
          break;
        case 500:
          toast.error(error?.payload?.data?.msg);
          break;
        default:
          toast.error(error?.payload?.data?.msg);
      }
    } else if (!error && status === "succeeded") {
      // toast.success()
    }
  }, [error]);

  let content;
  switch (nextPage) {
    case 0:
      content = (
        <ResetEmail
          text={
            <>
              <h2>Find your Cate Note account</h2>
              <p>
                Enter the email associated with your account to change your
                password
              </p>
            </>
          }
        />
      );
      break;
    case 1:
      content = (
        <ResetCode
          email={email}
          text="Check your email for get the verify code and change password"
        />
      );
      break;
    case 2:
      content = <ResetPass token={token} />;
      break;
    case 3:
      return navigate("/auth", { replace: true });
    default:
      content = (
        <ResetEmail
          text={
            <>
              <h2>Find your Cate Note account</h2>
              <p>
                Enter the email associated with your account to change your
                password
              </p>
            </>
          }
        />
      );
  }

  return (
    <div className={css.auth}>
      <div className={css.auth_ball}></div>
      <div className={css.auth_ball}></div>
      {content}
    </div>
  );
};

export default ResetPage;
