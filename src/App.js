import { Link, Route, Routes, navigator } from "react-router-dom";
import "./App.scss";
import React, { useContext } from "react";
import AuthContext from "./Store/Auth-context";
import { PrivateRoute, RouteNotAllow } from "./auth/AuthRequired";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import List from "./pages/List";
import Notes from "./pages/Notes";
import Account from "./pages/Account";
import TokenManager from "./helper/TokenManager";
import { useState } from "react";

const App = (props) => {
  const auth = useContext(AuthContext);
  const is_authed = auth.isLoggedIn;
  const [Logout, setLogout] = useState(null);

  const hanlderToken = () => {
    setLogout(Date.now());
    auth.logout();
  };
  return (
    <>
      {is_authed && (
        <TokenManager token={auth.token} onTokenExpired={hanlderToken} />
      )}
      <Toaster />

      {is_authed && <Navbar />}

      <main>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={"/lists"}>
              <Route index element={<List />} />
              <Route path={":id"} element={<List />} />
              {/* <Route path={"delete/:id"} element={<div>delete id</div>} /> */}
            </Route>
            <Route path="/notes">
              <Route index element={<Notes />} />
              <Route path="add" element={<Notes add={true} />} />
              <Route path=":id" element={<Notes />} />
            </Route>

            <Route path="/account">
              <Route index element={<Account />} />
            </Route>
          </Route>

          <Route
            path="/"
            element={
              <div>
                <Link to={"/auth/signup"}>signup</Link>
              </div>
            }
          />

          <Route element={<RouteNotAllow />}>
            <Route path={"/auth/signup"} element={<SignUp />} />
            <Route path={"/auth/signin"} element={<Signin />} />
          </Route>
          <Route
            path={"*"}
            element={
              is_authed ? (
                <div>page not found</div>
              ) : (
                <navigator to="/auth/signin" />
              )
            }
          />
        </Routes>
        <div className={"navLine"}></div>
      </main>
    </>
  );
};

export default App;
