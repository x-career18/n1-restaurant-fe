import React, { useEffect, useState } from 'react'
import AccountModal from '../../modals/AccountModal';
import Board from './Board';
import { AccountBoard } from '../../modelUI/AccountBoard';
import accountAPI from '../../apis/accountAPI';

const Account = () => {
    const [modalShow, setModalShow] = useState(false);
    const [listObj, setListObj] = useState([]);
    // Lấy danh sách user
    // Thêm user
    // Sửa user
    // Xóa user

    useEffect(() => {
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
        getAll();
    }, []);

    const handleOnclick = () => {
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
                    Đăng ký tài khoản
                </button>
            </div>
            <Board
                tableHead={AccountBoard}
                listObj={listObj}
            />
            <AccountModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                action="c"
            />
        </>
    )
}

export default Account