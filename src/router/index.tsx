import AuthGuard from "../components/auth/AuthGuard";
import CartPage from "../pages/cart/CartPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import Details from "../pages/product/details/Details";
import ProductPage from "../pages/product/ProductPage";
import ProfilePage from "../pages/profile/ProfilePage";
import { recordToNative, RouteRecords } from "./libs";

const routes = {
    home: {
        path: '/',
        element: <HomePage />
    },

    product: {
        path: '/products/:id',
        element: <ProductPage />,
        children: {
            details: {
                path: 'details',
                element: <Details />
            }
        }
    },

    cart: {
        path: '/cart',
        element: <AuthGuard><CartPage /></AuthGuard>,
    },

    login: {
        path: '/login',
        element: <LoginPage />,
    },

    profile: {
        path: '/profile',
        element: <ProfilePage />
    }

} as const satisfies RouteRecords


export type TRoutes = typeof routes;

export const routesNative = Object.values(routes).map(recordToNative)

export default routes

