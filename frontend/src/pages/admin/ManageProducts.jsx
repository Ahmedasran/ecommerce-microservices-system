import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/shared/Navbar";

import axios from "axios";

function ManageProducts() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchProducts();

    }, []);


    const fetchProducts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/product"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }
    };


    const deleteProduct = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/api/product/${id}`
            );

            fetchProducts();

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
                    Manage Products
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
                                    Product
                                </th>

                                <th className="p-5 text-left">
                                    Description
                                </th>

                                <th className="p-5 text-left">
                                    Price
                                </th>

                                <th className="p-5 text-left">
                                    Status
                                </th>

                                <th className="p-5 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-b"
                                >

                                    <td className="p-5">

                                        <div className="
                                            flex
                                            items-center
                                            gap-4
                                        ">

                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="
                                                    w-16
                                                    h-16
                                                    object-cover
                                                    rounded-xl
                                                "
                                            />

                                            <span className="font-semibold">
                                                {product.name}
                                            </span>

                                        </div>

                                    </td>

                                    <td className="p-5">
                                        {product.description}
                                    </td>

                                    <td className="p-5">
                                        ${product.price}
                                    </td>

                                    <td className="p-5">

                                        <span className={`
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-white
                                            font-semibold
                                            ${product.stockStatus === "IN_STOCK"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            }
                                        `}>

                                            {product.stockStatus}

                                        </span>

                                    </td>

                                    <td className="p-5 flex gap-4">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/edit-product/${product.id}`
                                                )
                                            }
                                            className="
                                                bg-yellow-500
                                                text-white
                                                px-4
                                                py-2
                                                rounded-xl
                                            "
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                            className="
                                                bg-red-500
                                                text-white
                                                px-4
                                                py-2
                                                rounded-xl
                                            "
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </>
    );
}

export default ManageProducts;