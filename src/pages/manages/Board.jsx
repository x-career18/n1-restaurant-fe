import { Button, Tooltip } from 'antd';
import React, { useContext, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import AppContext from '../../contexts/AppContext/AppContext';

const Board = ({ tableHead = {}, listObj = [], isAction = true, selected }) => {
    const { restaurants } = useContext(AppContext);
    return (
        <Table className='mx-0' responsive striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    {Object.keys(tableHead).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                    {
                        isAction && <th>Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    listObj.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {
                                    Object.keys(tableHead).map((key, index) => {
                                        if (key === "Trạng thái") {
                                            let status = "Đang hoạt động";
                                            let statusColor = "green";
                                            if (item[tableHead[key]] == 2) {
                                                status = "Đang bị khóa";
                                                statusColor = "yellow";
                                            } else if (item[tableHead[key]] == 3) {
                                                status = "Đã xóa";
                                                statusColor = "red";
                                            }
                                            return <td key={index}>
                                                <Tooltip title={status}>
                                                    <Button style={{
                                                        backgroundColor: statusColor
                                                    }} shape="circle" size="small">

                                                    </Button>
                                                </Tooltip>
                                            </td>
                                        }

                                        if (key === "Quyền hạn") {
                                            let role = "Nhân viên";
                                            if (item[tableHead[key]] == 1) {
                                                role = "Quản lý";
                                            }
                                            return <td key={index}>{role}</td>
                                        }

                                        if (key === "Nhà hàng") {
                                            const restaurant = restaurants.find((e) => e._id == item[tableHead[key]]);
                                            const name = restaurant.name;
                                            return <td key={index}>{name}</td>
                                        }

                                        return <td key={index}>{item[tableHead[key]]}</td>
                                    })
                                }
                                {
                                    isAction && <td> <div className='d-flex justify-content-start align-items-center gap-3'>
                                        <span>
                                            <FaRegPenToSquare className="text-info" onClick={() => selected({ action: "u", index: index })} />
                                        </span>

                                        <span >
                                            <FaRegTrashCan className="text-danger" onClick={() => selected({ action: "d", index: index })} />
                                        </span>
                                    </div></td>

                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default Board;