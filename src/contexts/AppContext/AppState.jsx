import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { randomInt } from "../../utils/Random";
import createTable from "../../models/Table";
import { FOOD } from "../../utils/LoadImage";
import createFood from "../../models/Food";
import { category } from "../../models/CategoryFood";
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
  const [requestError, setRequestError] = useState(false);

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

    getAllRestaurant();
    getAllCombo();

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
    try {
      const response = await restaurantAPI.getAll();

      if (response.data.success) {
        setRestaurants(response.data.data)
      }
      setRequestError(false);
    } catch (error) {
      setRestaurants([]);
      setRequestError(true);
    }

  }

  const getAllCombo = async () => {
    try {
      const response = await comboAPI.getAll();
      // Check response
      if (response.data.success) {
        setCombo(response.data.data);
      }

      setRequestError(false);
    } catch (error) {
      setCombo([]);
      setRequestError(true);
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
        requestError, setRequestError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
