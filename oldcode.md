```js
// import { useEffect, useState } from "react";
// import EmailCheck from "../components/PasswordResset/EmailCheck";
// import CodeCheck from "../components/PasswordResset/CheckCode";
// import { useSearchParams } from "react-router-dom";
// import useFetch, { FetchD } from "../hooks/useFetch";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { PassResset } from "../Store/slices/PassRessetSlice";
// import NewPassword from "../components/PasswordResset/NewPassword";

// const PasswordReset = ({ ...props }) => {
//   const [params, setparams] = useSearchParams();
//   const dispatch = useDispatch();

//   const [data, setdata] = useState(null);
//   const [action, setaction] = useState({
//     Email: false,
//     code: false,
//   });

//   useEffect(() => setparams(), []);

//   const EmailHandle = (values, actions) => {
//     try {
//       actions.setSubmitting(true);
//       const payload = {
//         body: {
//           email: values.email,
//         },
//         setparams,
//         setaction,
//       };
//       dispatch(PassResset(payload));
//       actions.setSubmitting(false);
//     } catch (err) {
//       console.log("error", err);
//       actions.setSubmitting(false);
//     }
//   };

//   const CodeHandle = (values, actions) => {
//     try {
//       actions.setSubmitting(true);
//       const payload = {
//         body: {
//           email: params.get("email"),
//           activeCode: values.code,
//         },
//         setparams,
//         setaction,
//       };
//       dispatch(PassResset(payload));
//       actions.setSubmitting(false);
//     } catch (err) {
//       console.log("error", err);
//       actions.setSubmitting(false);
//     }
//   };

//   const PasswordHandle = (values, actions) => {
//     try {
//       if (values.Passowrd !== values.PassowrdCM)
//         return toast.error("Passwords not matching?");

//       actions.setSubmitting(true);
//       console.log(values);

//       const payload = {
//         body: {
//           email: params.get("email"),
//           password: values.Passowrd,
//         },
//         setparams,
//         setaction,
//       };
//       dispatch(PassResset(payload));
//       actions.setSubmitting(false);
//     } catch (err) {
//       console.log("error", err);
//       actions.setSubmitting(false);
//     }
//   };
//   const checkAction = () => {
//     if (action.Email === false && action.code === false) {
//       return <EmailCheck EmailCheck={EmailHandle} />;
//     } else if (action.Email === true && action.code === false) {
//       return <CodeCheck CodeCheck={CodeHandle} />;
//     } else if (action.Email === true && action.code === true) {
//       return <NewPassword PasswordSubmit={PasswordHandle} />;
//     }
//   };
//   return <>{checkAction()}</>;
// };
```
