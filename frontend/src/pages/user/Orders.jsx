import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/shared/Navbar";
import { getOrders } from "../../services/getOrders";

function Orders() {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();


    // FETCH ORDERS

    const fetchOrders = async () => {

        try {

            const data = await getOrders();

            setOrders([...data]);

        } catch (error) {

            console.error(error);

        }

    };


    // FETCH ONCE

    useEffect(() => {

        fetchOrders();

    }, []);


    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-16 px-8">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="flex justify-between items-center mb-12">

                        <div>

                            <h1 className="text-6xl font-bold text-gray-900">
                                My Orders
                            </h1>

                            <p className="text-gray-500 mt-4 text-xl">
                                Track all your orders and purchases
                            </p>

                        </div>


                        {/* BACK BUTTON */}

                        <button
                            onClick={() => navigate(-1)}
                            className="
                                bg-black
                                text-white
                                px-7
                                py-4
                                rounded-2xl
                                hover:bg-gray-800
                                transition
                                text-lg
                                font-semibold
                            "
                        >
                            Back
                        </button>

                    </div>


                    {
                        orders.length === 0 ? (

                            <div className="bg-white p-16 rounded-3xl shadow-lg text-center">

                                <h2 className="text-4xl font-bold mb-4">
                                    No Orders Yet
                                </h2>

                                <p className="text-gray-500 text-lg">
                                    Your placed orders will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                                <table className="w-full">

                                    <thead className="bg-black text-white">

                                        <tr>

                                            <th className="text-left p-6 text-xl">
                                                Order ID
                                            </th>

                                            <th className="text-left p-6 text-xl">
                                                Product
                                            </th>

                                            <th className="text-left p-6 text-xl">
                                                Quantity
                                            </th>

                                            <th className="text-left p-6 text-xl">
                                                Price
                                            </th>

                                            <th className="text-left p-6 text-xl">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            orders.map((order) => (

                                                order.orderLineItemsList.map((item) => (

                                                    <tr
                                                        key={`${order.id}-${item.id}`}
                                                        className="border-b hover:bg-gray-50 transition"
                                                    >

                                                        <td className="p-6 font-semibold">
                                                            #{order.id}
                                                        </td>

                                                        <td className="p-6 capitalize">
                                                            {item.skuCode.replaceAll("_", " ")}
                                                        </td>

                                                        <td className="p-6">
                                                            {item.quantity}
                                                        </td>

                                                        <td className="p-6 font-bold">
                                                            ${item.price}
                                                        </td>


                                                        {/* STATUS */}

                                                        <td className="p-6">

                                                            {
                                                                order.status === "APPROVED" ? (

                                                                    <span
                                                                        className="
                                                                            bg-green-100
                                                                            text-green-700
                                                                            px-5
                                                                            py-2
                                                                            rounded-full
                                                                            font-semibold
                                                                        "
                                                                    >
                                                                        Approved
                                                                    </span>

                                                                ) : order.status === "FAILED" ? (

                                                                    <span
                                                                        className="
                                                                            bg-red-100
                                                                            text-red-700
                                                                            px-5
                                                                            py-2
                                                                            rounded-full
                                                                            font-semibold
                                                                        "
                                                                    >
                                                                        Out Of Stock
                                                                    </span>

                                                                ) : (

                                                                    <span
                                                                        className="
                                                                            bg-yellow-100
                                                                            text-yellow-700
                                                                            px-5
                                                                            py-2
                                                                            rounded-full
                                                                            font-semibold
                                                                        "
                                                                    >
                                                                        Pending
                                                                    </span>

                                                                )
                                                            }

                                                        </td>

                                                    </tr>

                                                ))

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                    }

                </div>

            </div>

        </>
    );
}

export default Orders;