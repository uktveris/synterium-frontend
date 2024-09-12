import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const { setAuthed } = useAuth();
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
    }
  };

  const navToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <h1>This is register page</h1>
      <form onSubmit={handleSubmit(onSubmit)} name="register">
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

        <label htmlFor="confirmPwd">Confirm password: </label>
        <input
          type="password"
          {...register("confirmPwd", { required: "Need to confirm password!" })}
        />
        {errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}
        <button type="submit">Register</button>
        {invalidPwd && <p>The passwords do not match!</p>}
      </form>
      <button onClick={navToLogin}>Already have an account?</button>
    </>
  );
}

export { Register };
