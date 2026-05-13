import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

function ProductCard({ product }) {

    const { addToCart } = useContext(CartContext);

    const navigate = useNavigate();


    // CHECK STOCK STATUS

    const isOutOfStock =
        product.stockStatus === "OUT_OF_STOCK";


    // ADD TO CART

    const handleAddToCart = () => {

        if(isOutOfStock){
            return;
        }

        addToCart(product);

        navigate("/cart");

    };


    return (

        <div
            className="
                bg-white
                rounded-[32px]
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-300
                flex
                flex-col
                border
                border-gray-100
                group
            "
        >

            {/* IMAGE SECTION */}

            <div className="
                relative
                h-[340px]
                bg-gradient-to-b
                from-gray-50
                to-gray-100
                flex
                items-center
                justify-center
                p-10
                overflow-hidden
            ">

                {/* STOCK BADGE */}

                {
                    !isOutOfStock ? (

                        <span className="
                            absolute
                            top-5
                            left-5
                            bg-green-500
                            text-white
                            px-5
                            py-2
                            rounded-full
                            text-sm
                            font-bold
                            shadow-lg
                        ">
                            In Stock
                        </span>

                    ) : (

                        <span className="
                            absolute
                            top-5
                            left-5
                            bg-red-500
                            text-white
                            px-5
                            py-2
                            rounded-full
                            text-sm
                            font-bold
                            shadow-lg
                        ">
                            Out Of Stock
                        </span>

                    )
                }


                {/* PRODUCT IMAGE */}

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="
                        max-h-[240px]
                        w-auto
                        object-contain
                        group-hover:scale-110
                        transition-all
                        duration-500
                    "
                />

            </div>


            {/* CONTENT */}

            <div className="p-8 flex flex-col flex-1">

                {/* PRODUCT INFO */}

                <div className="mb-5">

                    <h2 className="
                        text-3xl
                        font-extrabold
                        text-gray-900
                        mb-2
                    ">
                        {product.name}
                    </h2>

                    <p className="
                        text-gray-400
                        text-sm
                        uppercase
                        tracking-widest
                    ">
                        {product.skuCode}
                    </p>

                </div>


                {/* DESCRIPTION */}

                <p className="
                    text-gray-500
                    leading-8
                    text-lg
                    mb-8
                ">

                    {product.description}

                </p>


                {/* PRICE */}

                <div className="
                    flex
                    justify-between
                    items-center
                    mb-8
                ">

                    <div>

                        <p className="text-gray-400 text-sm mb-1">
                            Price
                        </p>

                        <h3 className="
                            text-4xl
                            font-black
                            text-black
                        ">
                            ${product.price}
                        </h3>

                    </div>

                </div>


                {/* BUTTON */}

                {
                    !isOutOfStock ? (

                        <button
                            onClick={handleAddToCart}
                            className="
                                w-full
                                bg-black
                                text-white
                                py-4
                                rounded-2xl
                                hover:bg-gray-800
                                transition-all
                                duration-300
                                font-semibold
                                text-lg
                                hover:scale-[1.02]
                            "
                        >
                            Add To Cart
                        </button>

                    ) : (

                        <button
                            disabled
                            className="
                                w-full
                                bg-gray-200
                                text-gray-500
                                py-4
                                rounded-2xl
                                cursor-not-allowed
                                font-semibold
                                text-lg
                            "
                        >
                            Currently Unavailable
                        </button>

                    )
                }

            </div>

        </div>

    );
}

export default ProductCard;