import { useEffect } from "react";
import { axiosMain, axiosPrivate } from "../api/axiosProvider";
import useAuth from "./useAuth";

function useAxiosPrivate() {
  const { authed, accessToken, setAccessToken } = useAuth();

  console.log("useAxiosPrivate: access token from memory: " + accessToken);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalReq = error.config;
        if (error.response?.status === 403 && !originalReq._retry) {
          originalReq._retry = true;

          axiosMain
            .get("/refresh", { withCredentials: true })
            .then((response) => {
              const refreshedAccessToken = response.data.accessToken;
              console.log(
                "LOG: useAxiosPrivate - refresher: new access token: " +
                  refreshedAccessToken,
              );
              setAccessToken(refreshedAccessToken);
              originalReq.headers["Authorization"] =
                "Bearer " + refreshedAccessToken;
            })
            .catch((err) => {
              console.log(
                "ERROR: refresher: error while accesing /refresh: " +
                  (err as Error).message,
              );
              return Promise.reject(err);
            });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, setAccessToken]);
  return axiosPrivate;
}

export { useAxiosPrivate };
