import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();
    };

const navLinks = user

    ? (

        user?.role === "ADMIN"

            ? [

                {
                    name: "Home",
                    path: "/"
                },

                {
                    name: "Products",
                    path: "/products"
                },

                {
                    name: "Dashboard",
                    path: "/admin/dashboard"
                },

                {
                    name: "Add Product",
                    path: "/admin/add-product"
                },

                {
                    name: "Manage Products",
                    path: "/admin/manage-products"
                },

                {
                    name: "Manage Orders",
                    path: "/admin/manage-orders"
                }

            ]

            : [

                {
                    name: "Home",
                    path: "/"
                },

                {
                    name: "Products",
                    path: "/products"
                },

                {
                    name: "Cart",
                    path: "/cart"
                },

                {
                    name: "Orders",
                    path: "/orders"
                }

            ]

    )

    : [

        {
            name: "Home",
            path: "/"
        },

        {
            name: "Products",
            path: "/products"
        }

    ];


    return (

        <nav className="
            bg-black
            text-white
            px-10
            py-5
            flex
            justify-between
            items-center
            shadow-lg
        ">

            {/* LOGO */}

            <Link
                to="/"
                className="text-3xl font-extrabold text-blue-500"
            >
                MicroStore
            </Link>


            {/* LINKS */}

            <div className="flex items-center gap-8 text-lg">

                {
                    navLinks.map((link) => (

                        <Link
                            key={link.path}
                            to={link.path}
                            className={`
                                transition
                                hover:text-blue-400
                                ${location.pathname === link.path
                                    ? "text-blue-500 font-bold"
                                    : "text-white"
                                }
                            `}
                        >
                            {link.name}
                        </Link>

                    ))
                }


                {/* USER */}

                {
                    user ? (

                        <>

                            <Link
                                to="/profile"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-blue-400
                                    font-semibold
                                    hover:text-blue-300
                                    transition
                                "
                            >

                                <div className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-blue-500
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-bold
                                ">

                                    {user?.name?.charAt(0).toUpperCase()}

                                </div>

                                <span>
                                    {user?.name}
                                </span>

                            </Link>

                            <button
                                onClick={handleLogout}
                                className="
                                    bg-red-500
                                    px-4
                                    py-2
                                    rounded-xl
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <div className="flex items-center gap-5">

                            <Link
                                to="/login"
                                className={`
                                    transition
                                    hover:text-blue-400
                                    ${location.pathname === "/login"
                                        ? "text-blue-500 font-bold"
                                        : "text-white"
                                    }
                                `}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className={`
                                    bg-blue-500
                                    px-4
                                    py-2
                                    rounded-xl
                                    hover:bg-blue-600
                                    transition
                                    font-semibold
                                    ${location.pathname === "/register"
                                        ? "bg-blue-700"
                                        : ""
                                    }
                                `}
                            >
                                Register Now
                            </Link>

                        </div>

                    )
                }

            </div>

        </nav>
    );
}

export default Navbar;