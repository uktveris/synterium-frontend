// import useAuth from "./useAuth";
// import { axiosPrivate } from "../api/axiosProvider";

// function useRefreshToken() {
//   const { setAuthed } = useAuth();

//   const refresh = async () => {
//     axiosPrivate
//       .get("/refresh", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(
//           "LOG: useRefreshToken hook - received access token: " +
//             response.data.accessToken,
//         );
//         setAuthed((prev) => {
//           console.log(
//             "LOG: userefreshToken hook - prev accesstoken :" +
//               JSON.stringify(prev),
//           );
//           return { ...prev, accessToken: response.data.accessToken };
//         });
//       })
//       .catch((err) =>
//         console.log("LOG: useRefreshToken - error: " + (err as Error).message),
//       );
//     return response.data.accessToken;
//   };

//   return refresh;
// }

// export { useRefreshToken };
