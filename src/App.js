import { Route, Routes, navigator } from "react-router-dom";
import "./App.scss";
import React, { useContext } from "react";
import AuthContext from "./Store/Auth-context";
import { PrivateRoute, RouteNotAllow } from "./auth/AuthRequired";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import List from "./pages/List";

const App = (props) => {
  const auth = useContext(AuthContext);
  const is_authed = auth.isLoggedIn;

  return (
    <>
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
          </Route>

          <Route element={<RouteNotAllow />}>
            <Route path={"/auth/signup"} element={<SignUp />} />
            <Route path={"/auth/signin"} element={<Signin />} />
          </Route>
          <Route path={"*"} element={is_authed ? <diva>page not found</diva> : <navigator to='/auth/signin' />} />
        </Routes>
        <div className={"navLine"}></div>
      </main>
    </>
  );
};

export default App;
