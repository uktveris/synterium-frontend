import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Logout } from "../components/Logout";
import { FileUploader } from "../components/FileUploader";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import styles from "./home.module.css";
import Header from "../components/Header";

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
    <div className={styles.mainContainer}>
      <Header />
      <Hero />
      <Features />
      {authed && <p>You are logged in curently!</p>}
      {!authed && <p>You are logged out now!</p>}
      {!authed && <button onClick={navToLogin}>to login</button>}
      <button onClick={navToDash}> to dashboard</button>
      <button onClick={navtoSettings}> to settings</button>
      {!authed && <button onClick={navtoRegister}>to register</button>}
      {authed && <FileUploader />}
      {authed && <Logout />}
    </div>
  );
}

export { Home };
