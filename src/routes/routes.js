import { ManageNavbar } from "../modelUI/ManageNavbar";
import CheckIn from "../pages/CheckIn";
import CheckReservation from "../pages/CheckReservation";
import ComboMenu from "../pages/Combo-menu";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Table from "../pages/Table";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Food from "../pages/food/Food";
import Order from "../pages/Order";
import Manage from "../pages/manages/Manage";

const routes = [
    {
        path: "/",
        component: <Home />,
        isPrivate: false,
        isAdmin: false,
    },
    {
        path: "/login",
        component: <Login />,
        isPrivate: false,
        isAdmin: false,
    },
    {
        path: "/register",
        component: <Register />,
        isPrivate: false,
        isAdmin: false,
    },
    {
        path: "/table",
        component: <Table />,
        isPrivate: false,
        isAdmin: false,
    },
    {
        path: "/order",
        component: <Order />,
        isPrivate: true,
        isAdmin: false,
    },
    {
        path: "/menu",
        component: <Food />,
        isPrivate: false,
        isAdmin: false,
    },
    {
        path: "/payment",
        component: <Payment />,
        isPrivate: true,
        isAdmin: false,
    },
    {
        path: "/manage",
        component: <Manage />,
        isPrivate: true,
        isAdmin: false,
        navBar: ManageNavbar
    },
    {
        path: "/checkreservation",
        component: <CheckReservation />,
        isPrivate: false,
        isAdmin: false
    },
    {
        path: "/combo-menu",
        component: <ComboMenu />,
        isPrivate: false,
        isAdmin: false
    },
    {
        path: "/check-in",
        component: <CheckIn />,
        isPrivate: true,
        isAdmin: false
    },
];
export default routes;