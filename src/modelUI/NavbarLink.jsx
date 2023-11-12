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
            text: "Reservation"
        },
    ],
    navLinkRight: [
        {
            path: "/login",
            text: "Login"
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
    ]
};

const staff = {
    navLinkLeft: [
        {
            path: "/",
            text: "HomePage"
        },
        {
            path: "/order",
            text: "Order"
        },
        {
            path: "/check-in",
            text: "Check In"
        },
        {
            path: "/open-table",
            text: "Open"
        },
        {
            path: "/payment",
            text: "Payment"
        },
    ]
}

export { customer, manage, staff };