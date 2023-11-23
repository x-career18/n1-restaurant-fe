import Account from "../pages/manages/Account";
import Bill from "../pages/manages/Bill";
import Menu from "../pages/manages/Menu";
import Restaurant from "../pages/manages/Restaurant";
import Table from "../pages/manages/Table";

const ManageNavbar = [
    {
        name: "staff",
        page: <Account />,
    },
    {
        name: "restaurant",
        page: <Restaurant />,
    },
    {
        name: "menu",
        page: <Menu />,
    },
    {
        name: "bill",
        page: <Bill />,
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
