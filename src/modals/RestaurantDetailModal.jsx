import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { param } from "../contexts/QueryParam";

const infoShow = [
    "address",
    "openTime",
    "closeTime",
    "reportOrderCount",
    "description"
];

const RestaurantDetailModal = ({ show, onHide, restaurant }) => {
    const navigate = useNavigate();
    const [indexCarousel, setIndexCarousel] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndexCarousel(selectedIndex);
    };

    if (!restaurant) return;
    const handleParam = () => {
        onHide();
        navigate(`/table?${param.restaurants}=${restaurant.name}`);
    };

    // console.log("RestaurantDetailModal", restaurant);
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {restaurant.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Hiển thị danh sách ảnh */}
                <Carousel activeIndex={indexCarousel} onSelect={handleSelect} interval={3000}>
                    {
                        restaurant.images.map((item, index) => {
                            return (
                                <Carousel.Item
                                    key={index}
                                    interval={3000}
                                >
                                    <img
                                        src={item}
                                        alt={item}
                                        style={{
                                            width: '100%',
                                            height: 500
                                        }}
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel >
                {/* Hiển thị thông tin của nhà hàng */}
                {
                    infoShow.map((item, index) => {
                        return <div className='row' key={index}>
                            <div className='col'>
                                {item}
                            </div>
                            <div className='col'>
                                {restaurant[item] ? restaurant[item] : "Chưa có thông tin"}
                            </div>
                        </div>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => {
                    handleParam();
                }}>Đặt bàn</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RestaurantDetailModal