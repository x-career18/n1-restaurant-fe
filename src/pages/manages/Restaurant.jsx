import React, { useState } from 'react';
import Board from './Board';
import { RestaurantBoard } from '../../modelUI/RestaurantBoard';
import { useEffect } from 'react';
import restaurantAPI from '../../apis/restaurantAPI';
import RestaurantModal from '../../modals/RestaurantModal';

const Restaurant = () => {
    const [modalShow, setModalShow] = useState(false);
    const [listObj, setListObj] = useState([]);
    const [selected, setSelected] = useState({ action: "c", index: -2 });

    useEffect(() => {
        getAll();
    }, []);

    async function getAll() {
        try {
            const response = await restaurantAPI.getAll();
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
                    Thêm nhà hàng
                </button>
            </div>
            <Board
                tableHead={RestaurantBoard}
                listObj={listObj}
                selected={({ action, index }) => setSelected({ action, index })}
            />
            <RestaurantModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    getAll();
                }}
                action={selected.action}
                model={selected.index <= -1 ? {
                    images: [],
                    name: "",
                    address: "",
                    openingTime: "",
                    closingTime: "",
                    description: "",
                    deleted: true,
                } : listObj[selected.index]}
            />
        </>
    )
}

export default Restaurant