import React, { useContext, useEffect } from "react";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";
import { customer } from "../modelUI/NavbarLink";
import AuthContext from "../contexts/AuthContext/AuthContext";

const Navbar = () => {
  const { modeTab } = useContext(AuthContext);

  // Cập nhật navbar khi login/logout
  useEffect(() => {

  }, [modeTab]);

  return (
    <div
      className="my-header text-my-color-navbar p-2 d-flex align-items-center border-bottom text-uppercase border-warning-subtle"
      style={{
        height: 70,
      }}
    >
      <div className="d-flex align-items-center justify-content-between container">
        {/* Left side */}
        <div className="fs-3 fw-bold text-center">
          Brother Restaurant
        </div>

        {/* Right */}
        <div className="d-flex align-items-center d-none d-lg-block fs-5">
          <div className="p-3 d-flex align-items-center">
            {/* Số điện thoại */}
            <div
              className="px-1 rounded-1 d-flex align-items-center me-5"
              style={{
                backgroundColor: "#FCDAB4",
              }}
            >
              <img src="/phone.png" alt="phone.png" width={20} height={20} className="me-2" />
              <NavLink to="tel:0916767869" className='nav-link'>091 6767 869</NavLink>
            </div>
            {/* Danh sách nav bar */}
            <div className="d-flex justify-content-center align-items-center gap-4">
              {modeTab?.navLinkLeft?.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="nav-link"
                    onClick={(e) => { }}
                  >
                    {item.text}
                  </NavLink>
                );
              })}
              {modeTab?.navLinkRight?.map((item, index) => {
                return (
                  <NavLink
                    key={index + customer.navLinkLeft.length}
                    to={item.path}
                    className="nav-link"
                    onClick={(e) => { }}
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
