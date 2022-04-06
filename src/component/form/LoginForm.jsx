import { useContext, useRef } from "react";
import { authAction } from "../../contex/authAction";
import { AuthContext } from "../../contex/auth-context";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    dispatch(authAction.loginStart());

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        process.env.REACT_APP_REQUEST_PATH + "/api/auth/login",
        { email, password }
      );

      dispatch(authAction.loginSuccess(response.data));
    } catch (err) {
      console.log(err.message);
      dispatch(authAction.loginFailure(err.message));
    }
  };

  return (
    <form
      onSubmit={loginHandler}
      className="sd:w-[400px] rounded-lg shadow-[0px_1px_7px_0px_rgb(0,0,0,0.37)] flex flex-col items-center gap-4 p-4  m-auto bg-white"
    >
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
      <button
        type="submit"
        className="w-full h-12 text-xl text-center text-white bg-blue-500 rounded-lg disabled:cursor-progress"
        disabled={isFetching}
      >
        {isFetching ? (
          <CircularProgress color="inherit" size="20px" />
        ) : (
          "Log In"
        )}
      </button>
      <h4 className="text-base text-blue-500 ">Forgot Password?</h4>
      <Link
        to="/register"
        className="h-12 px-3 py-2 text-lg text-center text-white bg-green-500 rounded-lg "
      >
        Create a New Account
      </Link>
    </form>
  );
};

export default LoginForm;
