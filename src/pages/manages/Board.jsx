import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const Board = ({ tableHead = [], listObj = [], isAction = true }) => {
    return (
        <Table className='mx-0' responsive striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    {tableHead.map((key, index) => (
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
                                    tableHead.map((key, index) => (
                                        <td key={index}>{item[key]}</td>
                                    ))
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