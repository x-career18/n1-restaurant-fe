import React, { useEffect, useState } from 'react'
import AccountModal from '../../modals/AccountModal';
import Board from './Board';
import { AccountBoard } from '../../modelUI/AccountBoard';
import accountAPI from '../../apis/accountAPI';

const Account = () => {
    const [modalShow, setModalShow] = useState(false);
    const [listObj, setListObj] = useState([]);
    const [selected, setSelected] = useState({ action: "c", index: -2 });

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

    useEffect(() => {

        getAll();
    }, []);

    async function getAll() {
        try {
            const response = await accountAPI.getAll();
            if (response.data.success) {
                const accountList = response.data.data;
                setListObj(accountList);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-end p-2">
                <button
                    type="button"
                    className="bg-my-primary text-center text-white fs-5 p-2 rounded-1 border-0"
                    onClick={handleOnclick}
                >
                    Đăng ký tài khoản
                </button>
            </div>
            <Board
                tableHead={AccountBoard}
                listObj={listObj}
                selected={({ action, index }) => setSelected({ action, index })}
            />
            <AccountModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    setSelected({ action: "c", index: -2 });
                    getAll();
                }}
                action={selected.action}
                model={selected.index <= -1 ? {
                    avata: "/defaultImage.jpg",
                    name: "",
                    category: "",
                    unit: "",
                    costPerUnit: "",
                    discount: "",
                    description: "",
                    deleted: true,
                } : listObj[selected.index]}
            />
        </>
    )
}

export default Account