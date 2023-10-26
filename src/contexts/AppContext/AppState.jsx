import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { randomInt } from "../../utils/Random";
import createRestaurant from "../../models/Restaurant";
import createTable from "../../models/Table";
import { COMBO, FOOD, RESTAURANTS } from "../../utils/LoadImage";
import { customer, manage } from "../../modelUI/NavbarLink";
import createFood from "../../models/Food";
import { category } from "../../models/CategoryFood";
import reservationAPI from "../../apis/reservationAPI";
import restaurantAPI from "../../apis/restaurantAPI";
import comboAPI from "../../apis/comboAPI";

const AppState = ({ children }) => {
  const [tableList, setTableList] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [reservation, setReservation] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [modeTab, setModeTab] = useState({});
  const [foodOrder, setFoodOrder] = useState([]);
  const [menu, setMenu] = useState([]);
  const [combo, setCombo] = useState([]);

  useEffect(() => {
    let tables = [];
    for (let index = 0; index < 50; index++) {
      const item = createTable({
        tableId: index,
        image: "/table/CN_6.png",
        status: randomInt(3, 1),
        floor: '1',
        tablenumber: "Bàn số 0",
        numberSeat: "6",
        shape: "Vuông"
      });
      tables.push(item);
    }

    getAllRestaurant().then((data) => setRestaurants(data));
    getAllCombo().then((data) => setCombo(data));
    let menu = [];
    for (let index = 0; index < 50; index++) {
      const categoryId = randomInt(4, 1);
      const item = createFood({
        id: index,
        foodCode: index,
        img: FOOD[categoryId],
        foodName: categoryId - 1,
        category: category[categoryId],
        description: "",
        unit: "Chiếc",
        price: randomInt(100, 10),
        discount: 0
      });
      menu.push(item);
    }

    setTableList(tables);
    setMenu(menu);
  }, []);

  const getAllRestaurant = async () => {
    const response = await restaurantAPI.getAll();
    // Check response
    if (response.data.success) {
      return response.data.data;
    }
  }

  const getAllCombo = async () => {
    const response = await comboAPI.getAll();
    // Check response
    if (response.data.success) {
      return response.data.data;
    }
  }

  const refreshTableList = () => {
    let newTableList = [
      ...tableList,
      createTable({
        tableId: 5,
        image: "/table/CN_6.png",
        status: 1,
        floor: '1',
        tablenumber: "Bàn số 0",
        numberSeat: "6",
        shape: "Vuông"
      })
    ];
    setTableList(newTableList);
  };

  console.log("AppState");

  return (
    <AppContext.Provider
      value={{
        tableList, setTableList, refreshTableList,
        selectList, setSelectList,
        reservation, setReservation,
        restaurants, setRestaurants,
        modeTab, setModeTab,
        foodOrder, setFoodOrder,
        menu, setMenu,
        combo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
