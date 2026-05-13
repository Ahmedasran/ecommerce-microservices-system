import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);


    // ADD TO CART

    const addToCart = (product) => {

        const existingProduct = cartItems.find(
            (item) => item.id === product.id
        );

        if (existingProduct) {

            setCartItems(

                cartItems.map((item) =>

                    item.id === product.id

                        ? {
                              ...item,
                              cartQuantity: item.cartQuantity + 1
                          }

                        : item
                )

            );

        } else {

            setCartItems([

                ...cartItems,

                {
                    ...product,
                    cartQuantity: 1
                }

            ]);

        }

    };


    // REMOVE FROM CART

    const removeFromCart = (id) => {

        setCartItems(

            cartItems.filter((item) => item.id !== id)

        );

    };


    // INCREASE QUANTITY

    const increaseQuantity = (id) => {

        setCartItems(

            cartItems.map((item) =>

                item.id === id

                    ? {
                          ...item,
                          cartQuantity: item.cartQuantity + 1
                      }

                    : item
            )

        );

    };


    // DECREASE QUANTITY

    const decreaseQuantity = (id) => {

        setCartItems(

            cartItems.map((item) =>

                item.id === id

                    ? {
                          ...item,
                          cartQuantity:

                              item.cartQuantity > 1

                                  ? item.cartQuantity - 1

                                  : 1
                      }

                    : item
            )

        );

    };


    // CLEAR CART

    const clearCart = () => {

        setCartItems([]);

    };


    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}