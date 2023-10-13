import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'

const AccountModal = ({ show, onHide, action }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            contentClassName="modal-90"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {actionList[action].title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {actionList[action].action}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={() => {
                    onHide();
                }}>{actionList[action].title}</Button>
            </Modal.Footer>
        </Modal>
    );
}

const actionCreate = () => {
    return "Create User"
}

const actionUpdate = () => {
    return "Update User"
}

const actionDelete = () => {
    return "Delete User"
}

const actionList = {
    "c": {
        title: "Tạo mới",
        action: actionCreate()
    },
    "u":  {
        title: "Cập nhật",
        action: actionUpdate()
    },
    "d":  {
        title: "Xóa",
        action: actionDelete()
    },
}

export default AccountModal;