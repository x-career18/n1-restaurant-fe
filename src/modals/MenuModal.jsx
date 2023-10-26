import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'
import Food from '../pages/food/Food';
import { useSearchParams } from 'react-router-dom';
import { param } from '../contexts/QueryParam';

const MenuModal = ({ show, onHide , isCanel}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const restaurantName = searchParams.get(param.restaurants);

    const handleCanel = () => {
        onHide();
        isCanel();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
            fullscreen
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {restaurantName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Hiển thị menu của nhà hàng */}
                <Food showDesc={false} isModal={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCanel}>Close</Button>
                <Button onClick={() => {
                    onHide();
                }}>Đặt món</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MenuModal