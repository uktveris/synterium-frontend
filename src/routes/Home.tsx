import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Logout } from "../components/Logout";
import { FileUploader } from "../components/FileUploader";

function Home() {
  const navigate = useNavigate();
  const { authed } = useAuth();
  console.log("authed value is: " + authed);

  const navToLogin = () => {
    navigate("/login");
  };

  const navToDash = () => {
    navigate("/dashboard");
  };

  const navtoSettings = () => {
    navigate("/settings");
  };

  const navtoRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>This is the home page</h1>
      <p>Some text in the home page</p>
      {authed && <p>You are logged in curently!</p>}
      {!authed && <p>You are logged out now!</p>}
      {!authed && <button onClick={navToLogin}>to login</button>}
      <button onClick={navToDash}> to dashboard</button>
      <button onClick={navtoSettings}> to settings</button>
      {/* <button onClick={navtoRegister}> to register</button> */}
      {!authed && <button onClick={navtoRegister}>to register</button>}
      {authed && <FileUploader />}
      {authed && <Logout />}
    </>
  );
}

export { Home };
