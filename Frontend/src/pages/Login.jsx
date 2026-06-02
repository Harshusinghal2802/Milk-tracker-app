import {
  useState,
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";

const Login = () => {

  const token =
    localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form,
    setForm] =
    useState({
      email:"",
      password:"",
    });

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    await login(form);

    navigate("/");
  };

  return (
    <div className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-slate-100
    ">

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-3xl
        shadow-xl
        w-96
      "
      >

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <button
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
        "
        >
          Login
        </button>

        <p className="
          text-center
          mt-4
          text-sm
        ">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;