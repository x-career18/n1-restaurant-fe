import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const Board = ({ tableHead = {}, listObj = [], isAction = true }) => {
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
                                            if (item[tableHead[key]] == 2){
                                                status = "Đang bị khóa";
                                            }
                                            return  <td key={index}>{status}</td>
                                        }

                                        if (key === "Quyền hạn") {
                                            let role = "Nhân viên";
                                            if (item[tableHead[key]] == 1){
                                                role = "Quản lý";
                                            }
                                            return <td key={index}>{role}</td>
                                        }
                                        return <td key={index}>{item[tableHead[key]]}</td>
                                    })
                                }
                                {
                                    isAction && <td>{menuButtonAction()}</td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

const menuButtonAction = () => {
    return <div className='d-flex justify-content-start align-items-center gap-3'>
        <span>
            <FaRegPenToSquare className="text-info" />
        </span>

        <span >
            <FaRegTrashCan className="text-danger" />
        </span>
    </div>
}

export default Board;