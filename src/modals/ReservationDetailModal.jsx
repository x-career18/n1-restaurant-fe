import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { pasreStringtoData } from '../utils/DateUtil';
import { Table } from 'react-bootstrap';

const showOrder = {
    "item": "Tên món",
    "quantity": "Số lượng",
    "discount": "Giảm giá",
    "costPerUnit": "Giá"
}

const ReservationDetailModal = ({ show, onHide, reservation, openTable }) => {

    const handleCanel = () => {
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bàn số: {reservation?.tableId.toString()}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Hiển thị thông tin đặt bàn của nhà hàng */}
                <div className='row mx-0 justify-content-start'>
                    Tên: {reservation?.fullname}
                </div>
                <div className='row mx-0 justify-content-start'>
                    SĐT: {reservation?.phoneNo}
                </div>
                <div className='row mx-0 justify-content-start'>
                    Đặt: {pasreStringtoData(reservation?.checkinTime)}
                </div>
                <div className='row mx-0 justify-content-start'>
                    Hủy: {pasreStringtoData(reservation?.expiredTime)}
                </div>
                {
                    foodOrder(reservation?.order)
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCanel}>Close</Button>
                <Button onClick={() => {
                    openTable(reservation?.tableId);
                    onHide();
                }
                }>Check In</Button>
            </Modal.Footer>
        </Modal>
    )
}

const foodOrder = (order) => {
    return <Table className='mx-0' responsive striped>
        <thead>
            <tr>
                <th>#</th>
                {Object.values(showOrder).map((key, index) => (
                    <th key={index}>{key}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {
                order?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {
                                Object.keys(showOrder).map((key, index) => (
                                    <td key={index}>{item[key]}</td>
                                ))
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>
}

export default ReservationDetailModal