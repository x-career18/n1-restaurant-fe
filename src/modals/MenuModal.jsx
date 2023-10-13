import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'
import Food from '../pages/food/Food';

const MenuModal = ({ show, onHide , tableName}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="modal-90"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {tableName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Hiển thị menu của nhà hàng */}
                <Food showDesc={false}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => {
                    onHide();
                }}>Đặt món</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MenuModal