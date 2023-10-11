import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import { ManageNavbar } from '../../modelUI/ManageNavbar';
import { Col, Row } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';

const Manage = () => {

    return (
        <Row className='mx-0 my-0'
            style={{
                height: 'calc(100vh - 100px)'
            }}>
            <Col className='border-start border-end ' xs={2}>
                {
                    ManageNavbar.map((item, index) => {
                        return (
                                <NavLink
                                    key={index}
                                    to={item.name}
                                    className="nav-link fs-4 d-flex justify-content-center algin-items-center p-4 border-bottom"
                                    onClick={(e) => {

                                    }}
                                >
                                    {capitalizeFirstLetter(item.name)}
                                </NavLink>
                        );
                    })
                }
            </Col>
            <Col >
                <Outlet />
            </Col>
        </Row>
    )
}

export default Manage