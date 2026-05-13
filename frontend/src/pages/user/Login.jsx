import Navbar from "../../components/shared/Navbar";
import { useState } from "react";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await login({
        email,
        password
      });

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        })
      );

      alert("Login Success");

      navigate("/");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Invalid Email Or Password");
    }
  };

  return (

    <>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-6">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-[450px]">

          {/* HEADER */}

          <div className="text-center mb-10">

            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-lg">
              Login to your account
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6"
          >

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                border
                border-gray-300
                p-4
                rounded-2xl
                outline-none
                focus:border-black
                transition
                text-lg
              "
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                border
                border-gray-300
                p-4
                rounded-2xl
                outline-none
                focus:border-black
                transition
                text-lg
              "
            />


            {/* FORGOT PASSWORD */}

            <div className="flex justify-end">

              <a
                href="#"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </a>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                bg-black
                text-white
                py-4
                rounded-2xl
                hover:bg-gray-800
                transition
                text-lg
                font-semibold
              "
            >
              Login
            </button>


            {/* REGISTER */}

            <div className="text-center mt-2">

              <p className="text-gray-500">

                Don’t have an account?

                <a
                  href="/register"
                  className="text-blue-600 hover:underline ml-2 font-semibold"
                >
                  Create Account
                </a>

              </p>

            </div>

          </form>

        </div>

      </div>

    </>
  );
}

export default Login;