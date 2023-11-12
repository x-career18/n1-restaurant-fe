import Account from "../pages/manages/Account";
import Menu from "../pages/manages/Menu";

const ManageNavbar = [
    {
        name: "staff",
        page: <Account/>,
    },
    {
        name: "menu",
        page: <Menu/>,
    },
    {
        name: "restaurant",
        page: <Account/>,
    },
    {
        name: "table",
        page: <Account/>,
    },
    {
        name: "bill",
        page: <Account/>,
    },
    {
        name: "reservation",
        page: <Account/>,
    },
];

export { ManageNavbar };
