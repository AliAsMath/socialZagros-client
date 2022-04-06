import { useRef, useContext } from "react";
import { authAction } from "../../contex/authAction";
import { AuthContext } from "../../contex/auth-context";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const registerHandler = async (e) => {
    e.preventDefault();

    dispatch(authAction.loginStart());

    if (passwordRef.current.value !== repasswordRef.current.value)
      return repasswordRef.current.setCustomValidity("Password not match");

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      repassword: repasswordRef.current.value,
    };

    try {
      let response = await axios.post(
        process.env.REACT_APP_REQUEST_PATH + "/api/auth/register",
        user
      );

      console.log(response.data);

      dispatch(authAction.loginSuccess(response.data));
    } catch (err) {
      dispatch(authAction.loginFailure(err.message));
    }
  };

  return (
    <form
      onSubmit={registerHandler}
      className="sd:w-[400px] w-full rounded-lg shadow-[0px_1px_7px_0px_rgb(0,0,0,0.37)] flex flex-col items-center gap-4 p-4  m-auto bg-white"
    >
      <input
        type="text"
        name="username"
        ref={usernameRef}
        className=" focus:outline-none rounded-lg h-12 pl-5 text-lg border-gray-700  border-[1px] w-full  "
        placeholder="Username"
      />
      <input
        type="text"
        name="email"
        ref={emailRef}
        className=" focus:outline-none rounded-lg h-12 pl-5 text-lg border-gray-700  border-[1px] w-full  "
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        ref={passwordRef}
        className=" focus:outline-none rounded-lg h-12 pl-5 text-lg  border-gray-700 border-[1px] w-full  "
        placeholder="Password"
      />
      <input
        type="password"
        name="repassword"
        ref={repasswordRef}
        className=" focus:outline-none rounded-lg h-12 pl-5 text-lg  border-gray-700 border-[1px] w-full  "
        placeholder="Password Again"
      />
      <button
        type="submit"
        className="w-full h-12 text-xl text-center text-white bg-blue-500 rounded-lg"
      >
        {isFetching ? (
          <CircularProgress color="inherit" size="20px" />
        ) : (
          "Sign Up"
        )}
      </button>
      <Link
        to="/login"
        className="h-12 px-3 py-2 text-lg text-center text-white bg-green-500 rounded-lg "
      >
        Log into Account
      </Link>
    </form>
  );
};

export default RegisterForm;
