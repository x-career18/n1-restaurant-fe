const navLinkLeft = [
    {
        path: "/",
        text: "HomePage"
    },
    {
        path: "/menu",
        text: "Menu"
    },
    {
        path: "/contact",
        text: "Contact"
    },
    {
        path: "/table",
        text: "table"
    },
    {
        path: "/payment",
        text: "payment"
    },
    {
        path: "/order",
        text: "order"
    },
];

const navLinkRight = [
    {
        path: "/login",
        text: "Login"
    },
    {
        path: "/register",
        text: "Register"
    },
    {
        path: "/cart",
        text: "Cart"
    },
    {
        path: "/manage",
        text: "Manage"
    },
];

const customer = {
    navLinkLeft: [
        {
            path: "/",
            text: "HomePage"
        },
        {
            path: "/menu",
            text: "Menu"
        },
        {
            path: "/checkreservation",
            text: "CheckInfo"
        },
    ],
    navLinkRight: [
        {
            path: "/login",
            text: "Login"
        },
        {
            path: "/register",
            text: "Register"
        },
    ]
};

const manage = {
    navLinkLeft: [
        {
            path: "/",
            text: "HomePage"
        },
        {
            path: "/menu",
            text: "Menu"
        },
        {
            path: "/manage",
            text: "Manage"
        },
    ],
    navLinkRight: [
        {
            path: "/logout",
            text: "Logout"
        },
    ]
};

const staff = {
    navLinkLeft: [
        {
            path: "/",
            text: "HomePage"
        },
        {
            path: "/menu",
            text: "Menu"
        },
        {
            path: "/table",
            text: "Table"
        },
        {
            path: "/checkreservation",
            text: "CheckInfo"
        },
    ],
    navLinkRight: [
        {
            path: "/logout",
            text: "Logout"
        }
    ]
}

export { customer, manage, staff };