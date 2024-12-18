import { useEffect } from "react";
import { axiosMain, axiosPrivate } from "../api/axiosProvider";
import useAuth from "./useAuth";

function useAxiosPrivate() {
  const { authed, accessToken, setAccessToken } = useAuth();
  let currentToken = accessToken;

  useEffect(() => {
    console.log("useAxiosPrivate: access token from memory: " + accessToken);
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("LOG: REQUEST INTERCEPTOR EXECUTED with token ending in:");
        console.log(currentToken.slice(-10));
        if (currentToken) {
          config.headers["Authorization"] = "Bearer " + currentToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalReq = error.config;
        if (error.response?.status === 403 && !originalReq._retry) {
          originalReq._retry = true;

          try {
            const response = await axiosMain.get("/auth/refresh", {
              withCredentials: true,
            });
            const refreshedAccessToken = response.data.accessToken;
            currentToken = refreshedAccessToken;
            console.log(
              "LOG: useAxiosPrivate - refresher: new access token: " +
                refreshedAccessToken,
            );
            setAccessToken(refreshedAccessToken);
            originalReq.headers["Authorization"] =
              "Bearer " + refreshedAccessToken;
            return axiosPrivate(originalReq);
          } catch (err) {
            console.log(
              "ERROR: refresher: error while accessing /auth/refresh" +
                (err as Error).message,
            );
            return Promise.reject(err);
          }
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
