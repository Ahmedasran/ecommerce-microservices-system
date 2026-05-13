import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/shared/Navbar";
import { CartContext } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";

import toast from "react-hot-toast";

function Cart() {

    const navigate = useNavigate();

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    } = useContext(CartContext);


    // TOTAL PRICE

    const totalPrice = cartItems.reduce(

        (total, item) =>

            total + item.price * item.cartQuantity,

        0

    );


    // CHECKOUT

   // GET LOGGED USER

const user = JSON.parse(
    localStorage.getItem("user")
);


// CHECKOUT

const handleCheckout = async () => {

    try {

        const orderData = {

            email: user?.email,

            customerName: user?.name,

            orderLineItemsDtoList:

                cartItems.map((item) => ({

                    skuCode: item.skuCode,

                    price: item.price,

                    quantity: item.cartQuantity

                }))

        };

        console.log(orderData);

        await placeOrder(orderData);

        clearCart();

        toast.success("Order Placed Successfully 🚀");

        setTimeout(() => {

            navigate("/orders");

        }, 1500);

    } catch (error) {

        console.error(error);

        toast.error("Failed To Place Order ❌");

    }

};


    return (

        <>

            <Navbar />

            <div className="
                min-h-screen
                bg-[#f5f5f7]
                py-14
                px-6
            ">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="mb-12">

                        <h1 className="
                            text-5xl
                            font-black
                            text-gray-900
                            tracking-tight
                        ">
                            Shopping Cart
                        </h1>

                        <p className="
                            text-gray-500
                            mt-3
                            text-lg
                        ">
                            Review your selected products
                        </p>

                    </div>


                    {
                        cartItems.length === 0 ? (

                            <div className="
                                bg-white
                                rounded-[32px]
                                shadow-lg
                                p-20
                                text-center
                            ">

                                <h2 className="
                                    text-4xl
                                    font-bold
                                    text-gray-900
                                    mb-4
                                ">
                                    Your Cart is Empty
                                </h2>

                                <p className="
                                    text-gray-500
                                    text-lg
                                    mb-8
                                ">
                                    Add products to your cart to continue shopping.
                                </p>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="
                                        bg-black
                                        text-white
                                        px-8
                                        py-4
                                        rounded-2xl
                                        hover:bg-gray-800
                                        transition-all
                                        duration-300
                                        font-semibold
                                        text-lg
                                    "
                                >
                                    Explore Products
                                </button>

                            </div>

                        ) : (

                            <div className="
                                grid
                                lg:grid-cols-3
                                gap-8
                            ">

                                {/* CART ITEMS */}

                                <div className="
                                    lg:col-span-2
                                    flex
                                    flex-col
                                    gap-5
                                ">

                                    {
                                        cartItems.map((item) => (

                                            <div
                                                key={item.id}
                                                className="
                                                    bg-white
                                                    rounded-[28px]
                                                    p-5
                                                    shadow-md
                                                    border
                                                    border-gray-100
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-5
                                                "
                                            >

                                                {/* LEFT */}

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-5
                                                ">

                                                    {/* IMAGE */}

                                                    <div className="
                                                        bg-gray-100
                                                        h-[120px]
                                                        w-[120px]
                                                        rounded-2xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        p-4
                                                    ">

                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="
                                                                h-[90px]
                                                                object-contain
                                                            "
                                                        />

                                                    </div>


                                                    {/* PRODUCT INFO */}

                                                    <div>

                                                        <h2 className="
                                                            text-2xl
                                                            font-bold
                                                            text-gray-900
                                                            mb-2
                                                        ">
                                                            {item.name}
                                                        </h2>

                                                        <p className="
                                                            text-gray-400
                                                            text-sm
                                                            uppercase
                                                            tracking-[3px]
                                                            mb-5
                                                        ">
                                                            {item.skuCode}
                                                        </p>


                                                        {/* QUANTITY */}

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-4
                                                        ">

                                                            <button
                                                                onClick={() =>
                                                                    decreaseQuantity(item.id)
                                                                }
                                                                className="
                                                                    bg-gray-200
                                                                    hover:bg-gray-300
                                                                    h-[42px]
                                                                    w-[42px]
                                                                    rounded-xl
                                                                    text-xl
                                                                    font-bold
                                                                    transition
                                                                "
                                                            >
                                                                -
                                                            </button>


                                                            <span className="
                                                                text-2xl
                                                                font-bold
                                                                text-gray-900
                                                            ">
                                                                {item.cartQuantity}
                                                            </span>


                                                            <button
                                                                onClick={() =>
                                                                    increaseQuantity(item.id)
                                                                }
                                                                className="
                                                                    bg-black
                                                                    text-white
                                                                    hover:bg-gray-800
                                                                    h-[42px]
                                                                    w-[42px]
                                                                    rounded-xl
                                                                    text-xl
                                                                    font-bold
                                                                    transition
                                                                "
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* RIGHT */}

                                                <div className="text-right">

                                                    <h3 className="
                                                        text-3xl
                                                        font-black
                                                        text-black
                                                        mb-5
                                                    ">
                                                        $
                                                        {item.price * item.cartQuantity}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(item.id)
                                                        }
                                                        className="
                                                            bg-red-500
                                                            text-white
                                                            px-5
                                                            py-3
                                                            rounded-xl
                                                            hover:bg-red-600
                                                            transition-all
                                                            duration-300
                                                            font-semibold
                                                        "
                                                    >
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>


                                {/* ORDER SUMMARY */}

                                <div className="
                                    bg-white
                                    rounded-[32px]
                                    shadow-lg
                                    border
                                    border-gray-100
                                    p-8
                                    h-fit
                                ">

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-gray-900
                                        mb-8
                                    ">
                                        Order Summary
                                    </h2>


                                    <div className="
                                        flex
                                        justify-between
                                        mb-5
                                        text-lg
                                    ">

                                        <span className="text-gray-500">
                                            Products
                                        </span>

                                        <span className="font-semibold">
                                            {cartItems.length}
                                        </span>

                                    </div>


                                    <div className="
                                        flex
                                        justify-between
                                        mb-8
                                        text-lg
                                    ">

                                        <span className="text-gray-500">
                                            Total Price
                                        </span>

                                        <span className="
                                            font-black
                                            text-3xl
                                            text-black
                                        ">
                                            ${totalPrice}
                                        </span>

                                    </div>


                                    <button
                                        onClick={handleCheckout}
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
                                        "
                                    >
                                        Checkout
                                    </button>

                                </div>

                            </div>

                        )
                    }

                </div>

            </div>

        </>
    );
}

export default Cart;