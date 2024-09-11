// import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const navigate = useNavigate();

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

    // if (data.email && data.password) {
    //   navigate("/dashboard");
    // }
    axios
      .post<{ msg: string }>("http://localhost:8080/login", data)
      .then((response) => {
        console.log("response received!");
        console.log(response.data.msg);
        navigate("/dashboard");
      })
      .catch((err) => console.log("error: " + (err as Error).message));
  };

  return (
    <>
      <h1>This is login/register page</h1>
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
    </>
  );
}

export default Login;
