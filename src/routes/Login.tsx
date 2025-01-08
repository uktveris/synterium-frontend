import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosMain } from "../api/axiosProvider";
import useAuth from "../hooks/useAuth";
import styles from "./login.module.css";
import Header from "../components/Header";

interface FormInputs {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const { setAuthed, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navToRegister = () => {
    navigate("/register");
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data.email) {
      console.log("typed email: " + data.email);
    } else {
      console.log("no email was typed!!");
    }

    if (data.password) {
      console.log("typed password: " + data.password);
    } else {
      console.log("no password was typed!!");
    }

    axiosMain
      .post<{ data: { accessToken: string } }>("/auth/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(
          "LOG: login - response received, following accesstoken set:",
        );
        console.log(JSON.stringify(response.data));
        setAccessToken(response.data.accessToken);
        setAuthed(true);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("error: " + (err as Error).message));
  };

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <h1>Log in</h1>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} name="login">
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
            <button type="submit"> Login </button>
          </form>
        </div>
        <button className={styles.toRegisterButton} onClick={navToRegister}>
          No account? Register
        </button>
      </div>
    </div>
  );
}

export default Login;
