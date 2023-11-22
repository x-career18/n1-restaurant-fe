import Account from "../pages/manages/Account";
import Bill from "../pages/manages/Bill";
import Menu from "../pages/manages/Menu";
import Reservation from "../pages/manages/Reservation";
import Restaurant from "../pages/manages/Restaurant";
import Table from "../pages/manages/Table";

const ManageNavbar = [
    {
        name: "staff",
        page: <Account />,
    },
    {
        name: "menu",
        page: <Menu />,
    },
    {
        name: "restaurant",
        page: <Restaurant />,
    },
    {
        name: "table",
        page: <Table />,
    },
    {
        name: "OTP",
        page: <Table />,
    }
];

export { ManageNavbar };
