import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
      <button onClick={navToLogin}> to login</button>
      <button onClick={navToDash}> to dashboard</button>
      <button onClick={navtoSettings}> to settings</button>
      <button onClick={navtoRegister}> to register</button>
    </>
  );
}

export { Home };
