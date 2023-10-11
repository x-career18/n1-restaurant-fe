import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'

const AccountModal = ({ show, onHide, action }) => {
    // action: CRUD

    return (
        <Modal
            show={show}
            onHide={onHide}
            contentClassName="modal-90"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {action}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {action}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => {
                    onHide();
                }}>{action}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccountModal;