import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/user/Home";

import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

import Products from "./pages/user/Products";
import Orders from "./pages/user/Orders";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Cart from "./pages/user/Cart";
import Profile from "./pages/user/Profile";
import EditProduct from "./pages/admin/EditProduct";

import AdminRoute from "./pages/admin/AdminRoute";


const router = createBrowserRouter([

    // HOME

    {
        path: "/",
        element: <Home />
    },


    // PRODUCTS

    {
        path: "/products",
        element: <Products />
    },


    // ORDERS

    {
        path: "/orders",
        element: <Orders />
    },


    // LOGIN

    {
        path: "/login",
        element: <Login />
    },


    {
        path: "/edit-product/:id",
        element: <EditProduct />
    },


    // REGISTER

    {
        path: "/register",
        element: <Register />
    },


    // CART

    {
        path: "/cart",
        element: <Cart />
    },


    // PROFILE

    {
        path: "/profile",
        element: <Profile />
    },


    // ADMIN DASHBOARD

    {
        path: "/admin/dashboard",
        element: (
            <AdminRoute>
                <Dashboard />
            </AdminRoute>
        )
    },


    // ADMIN ADD PRODUCT

    {
        path: "/admin/add-product",
        element: (
            <AdminRoute>
                <AddProduct />
            </AdminRoute>
        )
    },


    // ADMIN MANAGE PRODUCTS

    {
        path: "/admin/manage-products",
        element: (
            <AdminRoute>
                <ManageProducts />
            </AdminRoute>
        )
    },


    // ADMIN MANAGE ORDERS

    {
        path: "/admin/manage-orders",
        element: (
            <AdminRoute>
                <ManageOrders />
            </AdminRoute>
        )
    }

]);

export default router;