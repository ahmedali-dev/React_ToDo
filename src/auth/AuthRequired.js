import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import authContext from "../Store/Auth-context";

export const PrivateRoute = () => {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? <Outlet /> : <Navigate to={"/auth/signin"} />;
};

export const RouteNotAllow = () => {
  const ctx = useContext(authContext);
  console.log(ctx.isLoggedIn);
  return ctx.isLoggedIn === false ? <Outlet /> : <Navigate to={"/"} />;
};
