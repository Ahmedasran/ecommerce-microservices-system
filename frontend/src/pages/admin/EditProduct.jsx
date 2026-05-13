import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/shared/Navbar";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        skuCode: "",
        imageUrl: "",
        quantity: ""
    });

    useEffect(() => {

        fetchProduct();

    }, []);


    const fetchProduct = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/product"
            );

            const foundProduct =
                response.data.find(
                    (p) => p.id === id
                );

            setProduct(foundProduct);

        } catch (error) {

            console.log(error);

        }
    };


    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/api/product/${id}`,
                product
            );

            alert(
                "Product Updated Successfully"
            );

            navigate(
                "/admin/manage-products"
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
                flex
                justify-center
                items-center
            ">

                <form
                    onSubmit={handleSubmit}
                    className="
                        bg-white
                        p-10
                        rounded-3xl
                        shadow-xl
                        w-[500px]
                        flex
                        flex-col
                        gap-5
                    "
                >

                    <h1 className="
                        text-4xl
                        font-bold
                        mb-5
                    ">
                        Edit Product
                    </h1>

                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="text"
                        name="skuCode"
                        value={product.skuCode}
                        onChange={handleChange}
                        placeholder="SKU Code"
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="p-4 border rounded-xl"
                    />

                    <button
                        className="
                            bg-black
                            text-white
                            p-4
                            rounded-xl
                        "
                    >
                        Update Product
                    </button>

                </form>

            </div>

        </>
    );
}

export default EditProduct;