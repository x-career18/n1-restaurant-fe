import React, { useState } from 'react';
import Board from './Board';
import { MenuBoard } from '../../modelUI/MenuBoard';
import menuItemAPI from '../../apis/menuAPI';
import { useEffect } from 'react';
import MenuItemModal from '../../modals/MenuItemModal';
import { notification } from 'antd';

const Menu = () => {
    const [modalShow, setModalShow] = useState(false);
    const [listObj, setListObj] = useState([]);
    const [mode, contextHolder] = notification.useNotification();
    const [selected, setSelected] = useState({ action: "c", index: -2 });

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        try {
            const response = await menuItemAPI.getAll();
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

    const handleIsDone = (success) => {
        openNotificationWithIcon(
            success ? "info" : "error",
            `Tạo ${success ? "" : "không"} thành công`
        );
    };

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    return (
        <>
            <div className="d-flex justify-content-end p-2">
                <button
                    type="button"
                    className="bg-my-primary text-center text-white fs-5 p-2 rounded-1 border-0"
                    onClick={handleOnclick}
                >
                    Thêm món
                </button>
            </div>
            <Board
                tableHead={MenuBoard}
                listObj={listObj}
                selected={({ action, index }) => setSelected({ action, index })}
            />
            <MenuItemModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    setSelected({ action: "c", index: -2 });
                    getAll();
                }}
                action={selected.action}
                model={listObj[selected.index]}
            />
        </>
    )
}

export default Menu