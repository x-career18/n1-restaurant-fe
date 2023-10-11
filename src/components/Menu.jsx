import React, { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const user = false;
  return (
    <div>
      <img
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="position-absolute start-0 w-100 z-1"
          style={{
            marginTop: 25
          }}>
          <div className="bg-my-primary text-white d-flex flex-column align-items-center justify-content-center fs-3"
            style={{
              height: 'calc(100vh - 100px)'
            }}>
            {links.map((item) => (
              <span className="mb-5" href={item.url} key={item.id} onClick={() => setOpen(false)}>
                {item.title}
              </span>
            ))}
            <span
              href={user ? "/orders" : "login"}
              onClick={() => setOpen(false)}
            >
              {user ? "Orders" : "Login"}
            </span>
            <span href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
