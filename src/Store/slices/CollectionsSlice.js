// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../hooks/axios";
// import { toast } from "react-hot-toast";
// import { isString } from "formik";


// function generateRandomID(len = 10) {
//   let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let id = "";
//   for (let i = 0; i < len; i++) {
//     let randomIndex = Math.floor(Math.random() * chars.length);
//     id += chars[randomIndex];
//   }
//   return id;
// }

// export const fetchCollectionData = createAsyncThunk(
//   "fetch/collectionData",
//   async (token) => {
//     const request = await axios.post("/collections", { token });
//     return await request.data;
//   });

// export const addCollection = createAsyncThunk(
//   "fetch/addcollection",
//   async ({ token, name, image }) => {
//     const request = await axios.post("/collections/add", {
//       id: generateRandomID(),
//       token,
//       name,
//       image
//     });

//     if (request.status == 200) {
//       // closeAddComp(false);
//     }
//     return {
//       res: request.data,
//       attrs: {
//         id: generateRandomID(),
//         id_user: token,
//         name,
//         urlImage: image,
//         tasks: []
//       }
//     };
//   });

// export const removeCollection = createAsyncThunk(
//   "fetch/removeCollecction",
//   async ({ token, id }) => {
//     const request = await axios.post("/collections/delete", {
//       token, id
//     });

//     return await { res: request.data, id };
//   }
// );

// export const editCollection = createAsyncThunk(
//   "fetch/editCollection",
//   async ({ token, id, name, image }) => {
//     const request = await axios.post("/collections/edit", {
//       token, id, name, image
//     });

//     return { res: request.data, id };
//   }
// );


// export const AddTask = createAsyncThunk(
//   "addData",
//   async ({ token, id, task_id, task }) => {
//     const request = await axios.post("/task/add", { token, id_collection: id, task });
//     return { res: await request.data, task: { token, id, task_id, task } };
//   }
// );


// export const UpdateTask = createAsyncThunk(
//   "updateTask",
//   async ({ id, token, id_task, status }) => {
//     const data = new FormData();
//     data.append("id_collection", id);
//     data.append("token", token);
//     data.append("id_task", id_task);
//     data.append("status", status);
//     const request = await axios.post("/task/status", data);
//     return { res: request.data, task: { id, token, id_task, status } };
//   }
// );

// export const RemoveTask = createAsyncThunk(
//   "removeData",
//   async ({ id, id_task, token }) => {
//     const data = new FormData();
//     data.append("id_collection", id);
//     data.append("token", token);
//     data.append("id_task", id_task);
//     const request = await axios.post("/task/delete", data);
//     return { res: request.data, task: { id, id_task, token } };
//   }
// );

// export const EditTask = createAsyncThunk(
//   "EditTask",
//   async ({ id, token, id_task, task }) => {
//     const data = new FormData();
//     data.append("id_collection", id);
//     data.append("token", token);
//     data.append("id_task", id_task);
//     data.append("task", task);
//     const request = await axios.post("/task/update", data);

//     return { res: request.data, task: { id, token, id_task, task } };
//   }
// );


// const initialState = {
//   tokenError: "",
//   loading: false,
//   data: [],
//   inputError: {},
//   removed: {}
// };


// const CollectionsSlice = createSlice({
//   name: "collection",
//   initialState,
//   extraReducers: (builder) => {
//     builder


//       // -----------------------------------------------
//       // -- collections
//       // -----------------------------------------------

//       .addCase(AddTask.pending, (state, { meta }) => {
//         const data = meta.arg;
//         const task = { id: data.task_id, name: data.task, star: true, status: false };

//         // update task
//         state.data = state.data.map(coll => {
//           if (coll.id == data.id) {
//             coll.tasks = [...coll.tasks, task];
//           }
//           return coll;
//         });

//         // add task to removed state because response send any error removed task
//         state.removed = task;
//       })
//       .addCase(AddTask.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.map(removed => {
//             if (removed.id == action.payload.task.id) {
//               removed.task = removed.tasks.filter(t => t.id !== action.payload.task.task_id);
//             }
//             return removed;
//           });

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         state.removed = {};
//         toast.success(action.payload.res?.message);

//       })
//       .addCase(AddTask.rejected, (state, action) => {
//         state.error = action.error.message;
//       })

//       .addCase(UpdateTask.pending, (state, { meta }) => {
//         const data = meta.arg;
//         state.data = state.data.map(coll => {
//           if (coll.id == data.id) {
//             for (const task of coll.tasks) {
//               if (task.id == data.id_task) {
//                 task.status = data.status;
//               }
//             }
//           }
//           return coll;
//         });
//         state.removed = data;
//       })
//       .addCase(UpdateTask.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.map(removed => {
//             if (removed.id == action.payload.task.id) {
//               for (const task of removed.tasks) {
//                 if (task.id == action.payload.task.id_task) {
//                   task.status = !action.payload.task.status;
//                 }
//               }
//             }
//             return removed;
//           });

//           state.removed = {};

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         toast.success(action.payload.res?.message);
//       })
//       .addCase(UpdateTask.rejected, (state, action) => {
//         state.error = action.error.message;
//       })

//       .addCase(RemoveTask.pending, (state, { meta }) => {
//         const data = meta.arg;
//         state.data = state.data.map(coll => {
//           if (coll.id == data.id) {
//             state.removed = coll.tasks;
//             coll.tasks = coll.tasks.filter(f => f.id !== data.id_task);
//           }
//           return coll;
//         });
//       })
//       .addCase(RemoveTask.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.map(removed => {
//             if (removed.id == action.payload.task.id) {
//               removed.tasks = state.removed;
//             }
//             return removed;
//           });

//           state.removed = {};

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         toast.success(action.payload.res?.message);
//       })
//       .addCase(RemoveTask.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(EditTask.pending, (state, { meta }) => {
//         const data = meta.arg;
//         state.data = state.data.map(coll => {
//           if (coll.id == data.id) {
//             for (const task of coll.tasks) {
//               if (task.id == data.id_task) {
//                 state.removed = task;
//                 task.name = data.task;
//               }
//             }
//           }
//           return coll;
//         });
//       })
//       .addCase(EditTask.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.map(removed => {
//             if (removed.id == action.payload.task.id) {
//               for (const task of removed.tasks) {
//                 if (task.id == action.payload.task.id_task) {
//                   task.name = state.removed.name;
//                 }
//               }
//             }
//             return removed;
//           });

//           state.removed = {};

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         toast.success(action.payload.res?.message);
//       })
//       .addCase(EditTask.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       // -----------------------------------------------
//       // -- collections
//       // -----------------------------------------------
//       .addCase(fetchCollectionData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCollectionData.fulfilled, (state, action) => {
//         state.loading = false;

//         if (action.payload.status !== 200) {
//           if (action.payload?.error?.token) {
//             state.tokenError = action.payload.error.token;
//           }
//           if (isString(action.payload?.error)) {
//             toast.error(action.payload?.error);
//           }
//           return;
//         }

//         state.data = action.payload.data;
//       })
//       .addCase(fetchCollectionData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addCollection.pending, (state, { meta }) => {
//         const { token, name, image } = meta.arg;
//         const attrs = {
//           id: generateRandomID(),
//           id_user: token,
//           name,
//           urlImage: image,
//           tasks: []
//         };
//         state.data = [...state.data, attrs];
//         state.removed = attrs;
//       })
//       .addCase(addCollection.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.filter(filter => filter.id !== state.removed.id);

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         toast.success(action.payload.res?.message);
//       })
//       .addCase(addCollection.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(removeCollection.pending, (state, { meta }) => {
//         const id = meta.arg.id;
//         state.removed = state.data.find(data => data.id === id);
//         state.data = state.data.filter(data => data.id !== id);

//       })
//       .addCase(removeCollection.fulfilled, (state, action) => {

//         if (action.payload.res.status !== 200) {

//           state.data = [...state.data, state.removed];

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }


//         //remove collection

//         state.removed = {};
//         toast.success(action.payload.res.message);
//         return;

//       })
//       .addCase(removeCollection.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(editCollection.pending, (state, { meta }) => {
//         const { id, name, image } = meta.arg;
//         state.removed = state.data.find(data => data.id == id);
//         state.data = state.data.map(data => {
//           if (data.id == id) {
//             data.name = name;
//             data.urlImage = image;
//           }
//           return data;
//         });
//       })
//       .addCase(editCollection.fulfilled, (state, action) => {
//         if (action.payload.res.status !== 200) {

//           state.data = state.data.map(data => {
//             if (data.id == action.payload.id) {
//               data.name = state.removed.name;
//               data.urlImage = state.removed.urlImage;
//             }
//             return data;
//           });

//           if (action.payload.res?.error?.token) {
//             state.tokenError = action.payload.res.error.token;
//             return;
//           }
//           if (isString(action.payload.res?.error)) {
//             state.inputError = action.payload.res?.error;
//             return;
//           }
//           return;
//         }

//         state.removed = {};
//         toast.success(action.payload.res.message);
//         return;

//       })
//       .addCase(editCollection.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   }
// });

// export default CollectionsSlice.reducer;