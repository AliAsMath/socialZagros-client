import LoginForm from "../component/form/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-10 p-10 sd:flex-row bg-emerald-100">
      <div className="w-full text-center sd:w-auto sd:text-left">
        <h1 className="mb-5 text-4xl font-extrabold text-blue-500 sd:text-5xl ">
          ZagrosSocial
        </h1>
        <h2 className="text-xl sd:text-2xl ">
          Connect with your friends on the ZagrosSocial
        </h2>
      </div>
      <div className="w-full sd:w-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
