import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styles from "./header.module.css";
import { Logout } from "./Logout";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { useEffect, useState } from "react";

function Header() {
  const { authed } = useAuth();
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={styles.headerList}
      style={{
        transform: show ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.5s ease",
      }}
    >
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
