import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Loading } from "../utils";

const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));
const Dashboard = lazy(() => import("./auth/dashboard/Dashboard"));
const Private = lazy(() => import("../private/Private"));
const Cart = lazy(() => import("./cart/Cart"));

const Product = lazy(() => import("./product/Product"));

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));
const Products = lazy(() => import("./auth/dashboard/products/Products"));
const Cart2 = lazy(() => import("./auth/dashboard/cart/Cart"));
const Users = lazy(() => import("./auth/dashboard/users/Users"));
const Profile = lazy(() => import("./auth/dashboard/profile/Profile"));

const RouteController = () => {
    const token = useSelector((state) => state.token);
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/product/:_id",
            element: (
                <Suspense fallback={<Loading />}>
                    <Product />
                </Suspense>
            ),
        },
        {
            path: "/cart",
            element: (
                <Suspense fallback={<Loading />}>
                    <Cart />
                </Suspense>
            ),
        },
        {
            path: "/auth",
            element: token ? (
                <Navigate to="/dashboard" />
            ) : (
                <Suspense fallback={<Loading />}>
                    <Auth />
                </Suspense>
            ),
            children: [
                {
                    path: "",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "dashboard",
            element: (
                <Suspense fallback={<Loading />}>
                    <Private />
                </Suspense>
            ),
            children: [
                {
                    path: "",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Dashboard />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: "",
                            element: (
                                <Suspense>
                                    <Products />
                                </Suspense>
                            ),
                        },
                        {
                            path: "cart",
                            element: (
                                <Suspense>
                                    <Cart2 />
                                </Suspense>
                            ),
                        },
                        {
                            path: "users",
                            element: (
                                <Suspense>
                                    <Users />
                                </Suspense>
                            ),
                        },
                        {
                            path: "profile",
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <Profile />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
    ]);

    return routes;
};

export default RouteController;
