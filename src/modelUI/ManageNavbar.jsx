import Account from "../pages/manages/Account";
import Menu from "../pages/manages/Menu";
import Restaurant from "../pages/manages/Restaurant";

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
        page: <Restaurant/>,
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
