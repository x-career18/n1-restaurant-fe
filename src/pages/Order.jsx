import React, { useContext, useState } from 'react'
import { notification } from "antd";
import Main from '../components/Main';
import AppContext from '../contexts/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import MenuModal from '../modals/MenuModal';

const Order = () => {
    const [mode, contextHolder] = notification.useNotification(); // success info warning error
    const { tableList } = useContext(AppContext);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [selectTableOrder, setSelectTableOrder] = useState(-1);
    let tableActiveList = [];

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    const handleChooseTable = (table) => {
        // Kiểm tra trạng thái bàn
        if (table.status !== 3) {
            openNotificationWithIcon(
                "warning",
                "Bạn chỉ được phép chọn bàn đang hoạt động.!"
            );
            return;
        }
        setSelectTableOrder(table.tableId);
        setModalShow(true);
    };

    tableActiveList = tableList.filter((item) => item.status === 3);

    return (
        <>
            {contextHolder}
            <div className="container">
                <div
                    className="mt-2 row align-items-center"
                    style={{
                        height: 60,
                    }}
                >
                    <h2 className="col px-4">Mời chọn bàn để đặt món</h2>
                </div>
                <div className="row row-cols-3 row-cols-lg-4">
                    {tableActiveList.map((item, index) => {
                        const styleDefault =
                            "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center p-3 fs-4 border-0";
                        const styleStatus =
                            item.status === 1
                                ? "color-free"
                                : item.status === 0
                                    ? "color-reservation"
                                    : "color-active";
                        return (
                            <div key={index} className="col p-4 ">
                                <button
                                    type="button"
                                    className={`${styleDefault} ${styleStatus}`}
                                    onClick={() => handleChooseTable(item)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.image}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    A {item.tableId}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <MenuModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                tableName={"Bàn số "+selectTableOrder}
            />
        </>
    );
};

export default Order