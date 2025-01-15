import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosMain } from "../api/axiosProvider";
import styles from "./login.module.css";
import Header from "../components/Header";
import { ParallaxBackground } from "../components/ParallaxBackground";

interface FormInputs {
  email: string;
  password: string;
  confirmPwd: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const { setAuthed, setAccessToken } = useAuth();
  const [invalidPwd, setInvalidPwd] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data.password !== data.confirmPwd) {
      setInvalidPwd(true);
    } else {
      setInvalidPwd(false);
      console.log("everything is correct:");
      console.log("typed email: " + data.email);
      console.log("typed password: " + data.password);
      console.log("typed pwd confirmation: " + data.confirmPwd);
      const email = data.email;
      const password = data.password;
      handleRegiser(email, password);
    }
  };

  const handleRegiser = async (email, password) => {
    try {
      const registerResponse = await axiosMain.post("/auth/register", {
        email,
        password,
      });
      if (!registerResponse.data.success) {
        console.log("LOG: no success found, but no error..");
        return;
      }
      const loginResponse = await axiosMain.post("/auth/login", {
        email,
        password,
      });
      const at = loginResponse.data.accessToken;
      console.log("SUCCESS: register: received at: " + at);
      setAccessToken(at);
      setAuthed(true);
      navigate("/dashboard");
    } catch (err) {
      console.log("ERROR register: " + (err as Error).message);
    }
  };

  const navToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <ParallaxBackground />
      <Header />
      <div className={styles.mainContainer}>
        <h1>Register</h1>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} name="register">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              {...register("email", { required: "Email is required!" })}
              className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && (
              <p className={styles.validationError}>{errors.email.message}</p>
            )}

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              {...register("password", { required: "Password is required!" })}
              className={`${styles.inputField} ${errors.password ? styles.inputError : ""}`}
            />
            {errors.password && (
              <p className={styles.validationError}>
                {errors.password.message}
              </p>
            )}

            <label htmlFor="confirmPwd">Confirm password: </label>
            <input
              type="password"
              {...register("confirmPwd", {
                required: "Need to confirm password!",
              })}
              className={`${styles.inputField} ${errors.confirmPwd ? styles.inputError : ""}`}
            />
            {errors.confirmPwd && (
              <p className={styles.validationError}>
                {errors.confirmPwd.message}
              </p>
            )}
            <button type="submit">Register</button>
            {invalidPwd && (
              <p className={styles.validationError}>
                The passwords do not match!
              </p>
            )}
          </form>
        </div>
        <button className={styles.toLoginButton} onClick={navToLogin}>
          Already have an account? Log in
        </button>
      </div>
    </>
  );
}

export { Register };
