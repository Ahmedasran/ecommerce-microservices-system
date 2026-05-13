import Navbar from "../../components/shared/Navbar";

import { useState } from "react";

import { createProduct }
from "../../services/productService";

function AddProduct() {

    const [name, setName] = useState("");

    const [description, setDescription]
        = useState("");

    const [price, setPrice] = useState("");

    const [skuCode, setSkuCode]
        = useState("");

    const [imageUrl, setImageUrl]
        = useState("");

    const [quantity, setQuantity]
        = useState("");


    const handleAddProduct = async (e) => {

        e.preventDefault();

        try {

            await createProduct({

                name,

                description,

                price,

                skuCode,

                imageUrl,

                quantity

            });

            alert(
                "Product Added Successfully"
            );

            setName("");

            setDescription("");

            setPrice("");

            setSkuCode("");

            setImageUrl("");

            setQuantity("");

        } catch(err){

            console.log(err);

            alert("Error Adding Product");
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
                p-10
            ">

                <div className="
                    bg-white
                    p-10
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-[600px]
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                        mb-8
                        text-center
                    ">
                        Add Product
                    </h1>

                    <form
                        onSubmit={handleAddProduct}
                        className="flex flex-col gap-5"
                    >

                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e)=>
                                setName(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <textarea
                            placeholder="Description"
                            rows="5"
                            value={description}
                            onChange={(e)=>
                                setDescription(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e)=>
                                setPrice(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <input
                            type="text"
                            placeholder="SKU Code"
                            value={skuCode}
                            onChange={(e)=>
                                setSkuCode(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e)=>
                                setImageUrl(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e)=>
                                setQuantity(e.target.value)
                            }
                            className="
                                border
                                p-4
                                rounded-2xl
                                outline-none
                            "
                        />

                        <button
                            type="submit"
                            className="
                                bg-blue-500
                                text-white
                                py-4
                                rounded-2xl
                                font-bold
                                hover:bg-blue-600
                                transition
                            "
                        >
                            Add Product
                        </button>

                    </form>

                </div>

            </div>

        </>
    );
}

export default AddProduct;