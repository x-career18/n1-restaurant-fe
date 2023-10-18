import React, { useContext, useState } from "react";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";
import { customer } from "../modelUI/NavbarLink";
import { isObjectEmpty } from "../utils/CheckEmpty";
import AppContext from "../contexts/AppContext/AppContext";

const Navbar = () => {
  const isLogin = false;
  const { modeTab } = useContext(AppContext);
  if (isObjectEmpty(modeTab)) return;

  return (
    <div
      className="my-header text-my-color-navbar p-2 d-flex align-items-center justify-content-center border-bottom text-uppercase border-warning-subtle"
      style={{
        height: 70,
      }}
    >
        <div className="d-flex align-items-center justify-content-between my-container">
          {/* Left side */}
          <div className="fs-3 fw-bold text-center">
            Brother Restaurant
          </div>

          {/* Right */}
          <div className="d-flex align-items-center d-none d-lg-block fs-4">
            <div className="p-3 d-flex align-items-center">
              {/* Số điện thoại */}
              <div
                className="px-1 rounded-1 d-flex align-items-center me-2"
                style={{
                  backgroundColor: "#FCDAB4",
                }}
              >
                <img src="/phone.png" alt="phone.png" width={20} height={20} />
                <span>099999999</span>
              </div>
              {/* Danh sách nav bar */}
              <div className="d-flex justify-content-center align-items-center gap-4">
                {customer.navLinkLeft.map((item, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={item.path}
                      className="nav-link"
                      onClick={(e) => {}}
                    >
                      {item.text}
                    </NavLink>
                  );
                })}
                {customer.navLinkRight.map((item, index) => {
                  return (
                    <NavLink
                      key={index + customer.navLinkLeft.length}
                      to={item.path}
                      className="nav-link"
                      onClick={(e) => {}}
                    >
                      {item.text}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
          {/* MOBILE MENU */}
          <div className="d-block d-lg-none d-xl-none">
            <Menu />
          </div>
        </div>
      </div>
  );
};

export default Navbar;
