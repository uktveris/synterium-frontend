import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styles from "./header.module.css";
import { Logout } from "./Logout";
import { ToggleThemeButton } from "./ToggleThemeButton";

function Header() {
  const { authed } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.headerList}>
      <nav>
        <ul>
          <li>
            <img
              src="../../assets/cloud-sotrage-synt.png"
              className={styles.logo}
            />
          </li>
          <li>
            <button onClick={() => navigate("/home")}>Home</button>
          </li>
          {authed && (
            <>
              <li>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/settings")}>Settings</button>
              </li>
            </>
          )}
          <div className={styles.leftSideHeaderItem}>
            {authed && (
              <li>
                <Logout />
              </li>
            )}
            {!authed && (
              <li>
                <button
                  className={styles.loginButton}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
              </li>
            )}
            <li>
              <ToggleThemeButton />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
