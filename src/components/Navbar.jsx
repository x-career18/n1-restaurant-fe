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
    <div className="my-header text-my-color-navbar p-4 d-flex align-items-center border-bottom text-uppercase border-warning-subtle position-relative"
      style={{
        height: 70
      }}
    >
      <div className="fs-3 fw-bold p-4 d-flex flex-fill justify-content-md-center align-items-center">
        <span>Brother Restaurant</span>
      </div>

      <div className="p-4 d-flex justify-content-start align-items-center flex-fill d-none d-md-block">
        <div className="d-flex justify-content-center align-items-center gap-4">
          {
            customer.navLinkLeft.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className="nav-link"
                  onClick={(e) => {

                  }}
                >
                  {item.text}
                </NavLink>
              );
            })
          }
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="d-block d-md-none d-lg-none d-xl-none">
        <Menu />
      </div>

      <div className="d-none d-md-block  flex-fill p-4 d-flex justify-content-end align-items-center">
        <div className="d-flex justify-content-end align-items-center flex-fill gap-4"

        >
          <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer px-1 rounded-1 w-50"
            style={{
              backgroundColor: '#FCDAB4'
            }}>
            <img src="/phone.png" alt="phone.png" width={20} height={20} />
            <span>123 456 78</span>
          </div>

          {/* Hiển thị tất cả */}
          {
            customer.navLinkRight.map((item, index) => {
              return <NavLink
                key={index + customer.navLinkLeft.length}
                to={item.path}
                className="nav-link"
                onClick={(e) => {

                }}
              >
                {item.text}
              </NavLink>
            })
          }
          {/* Kiểm tra trạng thái đăng nhập */}
          {/* {
            isLogin ? (
              <NavLink
                to={navLinkRight[1].path}
                className="nav-link"
                onClick={(e) => {

                }}
              >
                {navLinkRight[1].text}
              </NavLink>
            ) : (
              <NavLink
                to={navLinkRight[0].path}
                className="nav-link"
                onClick={(e) => {

                }}
              >
                {navLinkRight[0].text}
              </NavLink>
            )} */}
        </div>
      </div>

    </div>
  );
};

export default Navbar;
