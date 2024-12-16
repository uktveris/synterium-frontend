import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { axiosMain } from "../api/axiosProvider";

function Logout() {
  const { authed, setAuthed } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    axiosMain
      .post("/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("LOG: logout: response from backend: " + response);
        if (response.status == 204) {
          setAuthed(false);
          navigate("/login");
          console.log("LOG: logout: successfully logged out!");
        }
      })
      .catch((err) =>
        console.log("LOG: logout: error - " + (err as Error).message),
      );
  };

  return <>{authed && <button onClick={handleLogOut}>Logout</button>}</>;
}

export { Logout };
