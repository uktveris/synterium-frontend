import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

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

  const { setAuthed } = useAuth();
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

    axios
      .post<{ msg: string }>("http://localhost:8080/login", data)
      .then((response) => {
        console.log("response received!");
        console.log(JSON.stringify(response.data));
        setAuthed(true);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("error: " + (err as Error).message));
  };

  return (
    <>
      <h1>This is login page</h1>
      <form onSubmit={handleSubmit(onSubmit)} name="login">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          {...register("email", { required: "Email is required!" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          {...register("password", { required: "Password is required!" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit"> Login </button>
      </form>
      <button onClick={navToRegister}>Want to register?</button>
    </>
  );
}

export default Login;
