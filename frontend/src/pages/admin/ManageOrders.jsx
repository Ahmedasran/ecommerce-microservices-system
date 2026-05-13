import { useEffect, useState } from "react";

import Navbar from "../../components/shared/Navbar";

import axios from "axios";

function ManageOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

        const interval = setInterval(() => {

            fetchOrders();

        }, 3000);

        return () => clearInterval(interval);

    }, []);


    const fetchOrders = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/order"
            );

            setOrders(response.data);

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
                    Manage Orders
                </h1>

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-xl
                    overflow-hidden
                ">

                    <table className="w-full">

                        <thead className="bg-black text-white">

                            <tr>

                                <th className="p-5 text-left">
                                    Order ID
                                </th>

                                <th className="p-5 text-left">
                                    Order Number
                                </th>

                                <th className="p-5 text-left">
                                    Status
                                </th>

                                <th className="p-5 text-left">
                                    Items Count
                                </th>

                                <th className="p-5 text-left">
                                    Total Price
                                </th>

                                <th className="p-5 text-left">
                                    Products
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {orders.map((order) => {

                                const totalPrice =
                                    order.orderLineItemsList?.reduce(
                                        (sum, item) =>
                                            sum +
                                            item.price *
                                            item.quantity,
                                        0
                                    );

                                return (

                                    <tr
                                        key={order.id}
                                        className="border-b"
                                    >

                                        <td className="p-5 font-semibold">
                                            #{order.id}
                                        </td>

                                        <td className="p-5">
                                            {order.orderNumber}
                                        </td>

                                        <td className="p-5">

                                            <span className={`
                                                px-4
                                                py-2
                                                rounded-xl
                                                text-white
                                                font-semibold
                                                ${order.status === "APPROVED"
                                                    ? "bg-green-500"
                                                    : order.status === "FAILED"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                                }
                                            `}>

                                                {order.status}

                                            </span>

                                        </td>

                                        <td className="p-5 font-semibold">

                                            {
                                                order.orderLineItemsList?.length
                                            }

                                        </td>

                                        <td className="p-5 font-bold">

                                            ${totalPrice}

                                        </td>

                                        <td className="p-5">

                                            <div className="
                                                flex
                                                flex-col
                                                gap-3
                                            ">

                                                {order.orderLineItemsList?.map((item) => (

                                                    <div
                                                        key={item.id}
                                                        className="
                                                            bg-gray-100
                                                            p-4
                                                            rounded-2xl
                                                        "
                                                    >

                                                        <p>
                                                            SKU :
                                                            <span className="
                                                                font-bold
                                                                ml-2
                                                            ">
                                                                {item.skuCode}
                                                            </span>
                                                        </p>

                                                        <p>
                                                            Quantity :
                                                            <span className="
                                                                font-bold
                                                                ml-2
                                                            ">
                                                                {item.quantity}
                                                            </span>
                                                        </p>

                                                        <p>
                                                            Price :
                                                            <span className="
                                                                font-bold
                                                                ml-2
                                                            ">
                                                                ${item.price}
                                                            </span>
                                                        </p>

                                                    </div>

                                                ))}

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </>
    );
}

export default ManageOrders;