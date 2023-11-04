import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmOpenTable = ({ show, onHide, openTable, table }) => {

    const handleCanel = () => {
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Xác nhận
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Mở bàn số: {table.map((item) => item.tableName).toString()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCanel}>Close</Button>
                <Button onClick={() => {
                    openTable();
                    onHide();
                }}>Mở bàn</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmOpenTable