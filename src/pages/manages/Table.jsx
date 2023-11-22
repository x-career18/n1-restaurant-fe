import React, { useState } from 'react'
import TableModal from '../../modals/TableModal';
import Board from './Board';
import {TableBoard } from '../../modelUI/TableBoard';
import { useEffect } from 'react';
import tableAPI from '../../apis/tableAPI';

const Table = () => {
    const [modalShow, setModalShow] = useState(false);
    const [listObj, setListObj] = useState([]);
    const [selected, setSelected] = useState({ action: "c", index: -2 });

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        try {
            const response = await tableAPI.getAll();
            if (response.data.success) {
                const accountList = response.data.data;
                setListObj(accountList);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (selected.index < -1) {
            setModalShow(false);
            return;
        }

        setModalShow(true);
    }, [selected])

    const handleOnclick = () => {
        setSelected({ action: "c", index: -1 });
        setModalShow(true);
    };

    return (
        <>
            <div className="d-flex justify-content-end p-2">
                <button
                    type="button"
                    className="bg-my-primary text-center text-white fs-5 p-2 rounded-1 border-0"
                    onClick={handleOnclick}
                >
                    Thêm bàn
                </button>
            </div>
            <Board
                tableHead={TableBoard}
                listObj={listObj}
                selected={({ action, index }) => setSelected({ action, index })}
            />
            <TableModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    getAll();
                }}
                action={selected.action}
                model={selected.index <= -1 ? {
                    images: "",
                    name: "",
                    restaurantId: "",
                } : listObj[selected.index]}
            />
        </>
    )
}

export default Table