import Navbar from "../../components/shared/Navbar";
import { useState } from "react";
import { register } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords Do Not Match");
            return;
        }

        try{

            const res = await register({
                name,
                email,
                password
            });

            console.log(res.data);

            alert("Account Created Successfully");

            navigate("/login");

        }catch(err){

            console.log(err);

            alert("Registration Failed");
        }
    };

    return (

        <>

            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 px-6">

                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-[500px]">

                    {/* HEADER */}

                    <div className="text-center mb-10">

                        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
                            Create Account
                        </h1>

                        <p className="text-gray-500 text-lg">
                            Register and start shopping
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col gap-5"
                    >

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
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
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                            onChange={(e)=>setPassword(e.target.value)}
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
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
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


                        {/* BUTTON */}

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
                                mt-2
                            "
                        >
                            Create Account
                        </button>


                        {/* LOGIN */}

                        <div className="text-center mt-3">

                            <p className="text-gray-500">

                                Already have an account?

                                <a
                                    href="/login"
                                    className="text-blue-600 hover:underline ml-2 font-semibold"
                                >
                                    Login
                                </a>

                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default Register;