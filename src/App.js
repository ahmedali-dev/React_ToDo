import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import React, { useContext } from "react";
import AuthContext from "./Store/Auth-context";
import { PrivateRoute, RouteNotAllow } from "./auth/AuthRequired";
import { Toaster } from "react-hot-toast";
import Navbar from "./pages/Navbar";
import List from "./pages/List";
import Notes from "./pages/Notes";
import Account from "./pages/Account";
import PasswordReset from "./pages/PasswordReset";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList, selectAllList } from "./features/lists/listSlice";
import { getTask, selectAllTask } from "./features/tasks/taskSlice";
import { getNotes } from "./Store/slices/NotesSlice";
import { getNote, selectAllNotes } from "./features/notes/notesSlice";

const App = (props) => {
  const auth = useContext(AuthContext);
  const is_authed = auth.isLoggedIn;
  const dispatch = useDispatch();
  const list = useSelector(selectAllList);
  const task = useSelector(selectAllTask);
  const note = useSelector(selectAllNotes);
  useEffect(() => {
    if (!is_authed) return;
    if (list.length === 0) {
      dispatch(fetchList({ auth }));
    }

    if (task.length === 0) {
      dispatch(getTask({ auth }));
    }

    if (note.length === 0) {
      dispatch(getNote({ auth }));
    }
  }, [is_authed]);

  return (
    <>
      <Toaster />

      {is_authed && <Navbar />}

      <main>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={"/lists"}>
              <Route index element={<List />} />
              <Route path={":id"}>
                <Route index element={<List />} />
                <Route path=":filter" element={<List />} />
              </Route>
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
            <Route
              path="/"
              element={<Navigate to={"/lists"} replace={true} />}
            />
          </Route>

          <Route element={<RouteNotAllow />}>
            <Route
              path="/"
              element={<Navigate to={"/auth"} replace={true} />}
            />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/auth"} element={<Login />} />
            <Route path={"/password_reset"} element={<PasswordReset />} />
            <Route path={"/verifyUser"} element={<Verify />} />
          </Route>
          <Route
            path={"*"}
            element={
              is_authed ? <div>page not found</div> : <navigator to="/auth" />
            }
          />
        </Routes>
        {is_authed && <div className={"navLine"}></div>}
      </main>
    </>
  );
};

export default App;
