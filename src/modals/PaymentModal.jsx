import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext/AppContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import { Input } from 'antd';

const showOrder = {
    "item": "Tên món",
    "quantity": "Số lượng",
    "discount": "Giảm giá",
    "total": "Tổng giá"
}

const PaymentModal = ({ show, onHide, isCanel, tableName, payment }) => {
    const { foodOrder, setFoodOrder } = useContext(AppContext);

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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {tableName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    foodOrder.length !== 0
                        ? buildOrder(foodOrder)
                        : "Xin mời chọn món"
                }

            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex flex-column justify-content-start align-content-end gap-3'>
                    <div className='row'>
                        <div className='col'>
                            <h5>
                                Tổng tiền
                            </h5>
                        </div>
                        <div className='col border-bottom '>
                            <h5 className='text-end'>
                                {totalOrder(foodOrder)}
                            </h5>
                        </div>
                    </div>
                    {FormShowValue({ title: "Giảm giá" })}
                    {FormShowValue({ title: "Thành tiền" })}
                    {FormShowValue({ title: "Thanh toán" })}
                    <div className='d-flex justify-content-end gap-3'>
                        <Button onClick={handleCanel}>Close</Button>
                        <Button onClick={() => {
                            // cập nhật lại order
                            payment();
                            onHide();
                        }}>Thanh toán</Button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>
    );
}

const buildOrder = (order) => {
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
                                Object.keys(showOrder).map((key, index) => {
                                    if (key == "total") {
                                        const total = item["quantity"] * item["costPerUnit"];
                                        return <td key={index}>{total}</td>
                                    }
                                    return <td key={index}>{item[key]}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>
}

const FormShowValue = ({ title, value }) => {
    return (
        <div className='row'>
            <div className='col'>
                <h5>
                    {title}
                </h5>
            </div>
            <div className='col border-bottom'>
                <Input className='text-end' placeholder="0" bordered={false} />
            </div>
        </div>);
}

const totalOrder = (order) => {
    let total = 0;
    for (let index = 0; index < order.length; index++) {
        const item = order[index];
        total += item["quantity"] * item["costPerUnit"];
    }
    return total;
}

export default PaymentModal