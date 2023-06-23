import React, { useContext, useEffect } from "react";
import css from "./Account.module.scss";
import Button from "../components/UI/Button";
import authContext from "../Store/Auth-context";
import { useJwt } from "react-jwt";

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

const Account = () => {
  const ctx = useContext(authContext);
  const { decodedToken, isExpired } = useJwt(ctx.token);

  useEffect(() => {
    if (isExpired) {
      ctx.logout();
    }
  }, [isExpired, ctx]);


  return (
    <div className={css.account}>
      <div className={css.account_header}>
        <div
          className={css.account_header_image}
          style={{
            backgroundImage: `url(${ctx.avatar})`,
          }}
        ></div>
        <h1 className={css.account_header_name}>
          {decodedToken && decodedToken.name} {/* Ensure `decodedToken` exists before accessing its properties */}
        </h1>
      </div>

      <div className={css.account_content}>
        <div className={css.account_content_group}>
          <h3>Name</h3>
          <p>{decodedToken && decodedToken.name}</p> {/* Ensure `decodedToken` exists before accessing its properties */}
        </div>
        <div className={css.account_content_group}>
          <h3>Email</h3>
          <p>{decodedToken && decodedToken.email}</p> {/* Ensure `decodedToken` exists before accessing its properties */}
        </div>
      </div>

      <Button
        onClick={ctx.logout}
        classname={css.account_signout}
      >Sign Out</Button>
    </div>
  );
};

export default Account;
