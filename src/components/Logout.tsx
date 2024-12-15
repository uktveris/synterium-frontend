import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { axiosMain } from "../api/axiosProvider";

function Logout() {
  const { authed, setAuthed } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    axiosMain.post("http://localhost:8080/register").then((response) => {
      console.log("log out response from backend: " + response);
      if (response.status == 204) {
        setAuthed(false);
        navigate("/login");
        console.log("successfully logged out!");
      }
    });
  };

  return <>{authed && <button onClick={handleLogOut}>Logout</button>}</>;
}

export { Logout };
