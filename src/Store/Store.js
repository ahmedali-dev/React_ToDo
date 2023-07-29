import { configureStore } from "@reduxjs/toolkit";
import Notes from "./slices/NotesSlice";
import resetSlice from "../features/passRest/resetSlice";
import loginSlice from "../features/login/loginSlice";
import registerSlice from "../features/register/registerSlice";
import verifySlice from "../features/verifyUser/verifySlice";
import listSlice from "../features/lists/listSlice";
import taskSlice from "../features/tasks/taskSlice";
import notesSlice from "../features/notes/notesSlice";
const Store = configureStore({
  reducer: {
    list: listSlice,
    tasks: taskSlice,
    notes: notesSlice,
    reset: resetSlice,
    login: loginSlice,
    register: registerSlice,
    verify: verifySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
