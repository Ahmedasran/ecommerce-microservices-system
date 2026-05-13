    import { useEffect, useState } from "react";
    import Navbar from "../../components/shared/Navbar";
    import ProductCard from "../../components/product/ProductCard";
    import axios from "axios";

    function Products() {

        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);


        // FETCH PRODUCTS

        const fetchProducts = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/api/product"
                );

                console.log("API RESPONSE:", response.data);

                setProducts(response.data);

            } catch (error) {

                console.log("ERROR:", error);

            } finally {

                setLoading(false);

            }

        };


        useEffect(() => {

            fetchProducts();

        }, []);


        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-[#f5f5f7] py-12 px-6">

                    <div className="max-w-7xl mx-auto">

                        {/* HERO SECTION */}

                        <div className="text-center mb-14">

                            <span className="
                                bg-black
                                text-white
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                tracking-wide
                            ">
                                PREMIUM DEVICES
                            </span>

                            <h1 className="
                                text-5xl
                                md:text-7xl
                                font-black
                                text-gray-900
                                mt-6
                                tracking-tight
                            ">
                                Apple Store
                            </h1>

                            <p className="
                                text-gray-500
                                mt-6
                                text-lg
                                max-w-3xl
                                mx-auto
                                leading-9
                            ">
                                Discover premium Apple devices with elegant design,
                                powerful performance and next-level technology.
                            </p>

                        </div>


                        {/* LOADING */}

                        {
                            loading ? (

                                <div className="
                                    flex
                                    justify-center
                                    items-center
                                    h-[300px]
                                ">

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-gray-400
                                        animate-pulse
                                    ">
                                        Loading Products...
                                    </h2>

                                </div>

                            ) : products.length === 0 ? (

                                <div className="
                                    flex
                                    items-center
                                    justify-center
                                    h-[300px]
                                ">

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-gray-400
                                    ">
                                        No Products Available
                                    </h2>

                                </div>

                            ) : (

                                <div className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    xl:grid-cols-3
                                    gap-8
                                ">

                                    {
                                        products.map((product) => (

                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                            />

                                        ))
                                    }

                                </div>

                            )
                        }

                    </div>

                </div>

            </>
        );
    }

    export default Products;