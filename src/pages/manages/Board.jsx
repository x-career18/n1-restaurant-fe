import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';

const Board = ({ tableHead = [], listObj = [] }) => {
    return (
        <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    {tableHead.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                    <th>Action</th>
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
                                <td>Action</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default Board;