import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import { ManageNavbar } from '../../modelUI/ManageNavbar';
import { Col, Row } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';

const Manage = () => {

    return (
        <Row className='mx-0 my-0 h-100'>
            <Col className='border-start border-end ' xs={2}>
                {
                    ManageNavbar.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.name}
                                end
                                className="nav-link fs-4 d-flex justify-content-center algin-items-center p-4 border-bottom"
                                style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "black",
                                    };
                                }}
                            >
                                {capitalizeFirstLetter(item.name)}
                            </NavLink>
                        );
                    })
                }
            </Col>
            <Col className='overflow-auto h-100'>
                <Outlet />
            </Col>
        </Row>
    )
}

export default Manage