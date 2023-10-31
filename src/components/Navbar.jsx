import React, { useContext, useEffect } from "react";
import Menu from "./Menu";
import { NavLink } from "react-router-dom";
import { customer } from "../modelUI/NavbarLink";
import AuthContext from "../contexts/AuthContext/AuthContext";
import { Dropdown } from "antd";
import { FaChevronDown, FaPowerOff, FaRegUser } from "react-icons/fa6";

const logo =
  "https://drive.google.com/uc?export=view&id=1kvFDWul0NlJiF4Pc5fCGAdMqXhWWkUPY";

const Navbar = () => {
  const { modeTab, auth, handleLogout } = useContext(AuthContext);

  const items = [
    {
      key: '1',
      label: (
        <NavLink
          to={"/profile"}
          className="nav-link text-muted ms-2"
        >
          <FaRegUser className="text-muted ms-2" style={{ marginRight: 10 }} />
          Profile
        </NavLink>)
    },
    {
      key: '2',
      label: (
        <NavLink
          to={"/"}
          onClick={() => {
            handleLogout();
          }}
          className="nav-link text-muted ms-2"
        >
          <FaPowerOff className="text-danger ms-2" style={{ marginRight: 10 }} />
          Logout
        </NavLink>

      ),
    },
  ];
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
              {
                auth.isAuthenticated &&
                <Dropdown menu={{
                  items,
                }} placement="bottomRight">
                  <NavLink className="nav-link">
                    {auth.user.avata ? <img src={auth.user.avata} alt={auth.user.avata} width={20} height={20}
                      style={{
                        marginRight: 10
                      }} /> : <img src={logo} alt={logo} width={20} height={20}
                        style={{
                          marginRight: 10
                        }} />}
                    {auth.user.fullName}
                    <FaChevronDown className="text-muted ms-2" />
                  </NavLink>
                </Dropdown>
              }
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
