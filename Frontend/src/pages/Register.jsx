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

const Register = () => {

  const token =
    localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const navigate =
    useNavigate();

  const { register } =
    useContext(AuthContext);

  const [form,
    setForm] =
    useState({
      name:"",
      email:"",
      password:"",
    });

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    await register(form);

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
          Register
        </h1>

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
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
          bg-green-600
          text-white
          py-3
          rounded-xl
        "
        >
          Register
        </button>

        <p className="
          text-center
          mt-4
          text-sm
        ">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;