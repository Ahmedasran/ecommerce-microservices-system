import { useEffect, useState } from "react";

import Navbar from "../../components/shared/Navbar";

import axios from "axios";

function Dashboard() {

    const [productsCount, setProductsCount] = useState(0);

    const [ordersCount, setOrdersCount] = useState(0);

    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {

        fetchDashboardData();

    }, []);


    const fetchDashboardData = async () => {

        try {

            // PRODUCTS

            const productsResponse = await axios.get(
                "http://localhost:8080/api/product"
            );

            setProductsCount(
                productsResponse.data.length
            );


            // ORDERS

            const ordersResponse = await axios.get(
                "http://localhost:8081/api/order"
            );

            setOrdersCount(
                ordersResponse.data.length
            );


            // USERS

            const usersResponse = await axios.get(
                "http://localhost:8084/api/user"
            );

            setUsersCount(
                usersResponse.data.length
            );

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <>

            <Navbar />

            <div className="
                min-h-screen
                bg-gray-100
                p-10
            ">

                <h1 className="
                    text-5xl
                    font-bold
                    mb-10
                ">
                    Admin Dashboard
                </h1>

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-8
                ">

                    {/* PRODUCTS */}

                    <div className="
                        bg-white
                        p-8
                        rounded-3xl
                        shadow-xl
                        hover:scale-105
                        transition
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-3
                        ">
                            Total Products
                        </h2>

                        <p className="
                            text-5xl
                            font-bold
                            text-blue-500
                        ">
                            {productsCount}
                        </p>

                    </div>


                    {/* ORDERS */}

                    <div className="
                        bg-white
                        p-8
                        rounded-3xl
                        shadow-xl
                        hover:scale-105
                        transition
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-3
                        ">
                            Total Orders
                        </h2>

                        <p className="
                            text-5xl
                            font-bold
                            text-green-500
                        ">
                            {ordersCount}
                        </p>

                    </div>


                    {/* USERS */}

                    <div className="
                        bg-white
                        p-8
                        rounded-3xl
                        shadow-xl
                        hover:scale-105
                        transition
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-3
                        ">
                            Total Users
                        </h2>

                        <p className="
                            text-5xl
                            font-bold
                            text-red-500
                        ">
                            {usersCount}
                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Dashboard;