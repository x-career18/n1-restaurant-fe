import React, { useState } from 'react'
import AccountModal from '../../modals/AccountModal';
import Board from './Board';
import { AccountBoard } from '../../modelUI/AccountBoard';

const Reservation = () => {
    const [modalShow, setModalShow] = useState(false);

    // Lấy danh sách user
    // Thêm user
    // Sửa user
    // Xóa user

    let listObj = [];
    for (let index = 0; index < 50; index++) {
        listObj.push({
            name: `Số hưởng số ${index} `,
            address: "2",
            openTime: "3",
            closeTime: "4",
            description: "5",
            images: ["sdfklj"],
        });
    }

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

export default Reservation