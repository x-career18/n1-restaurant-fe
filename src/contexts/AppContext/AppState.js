import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { randomInt } from "../../utils/Random";
import createRestaurant from "../../models/Restaurant";
import createTable from "../../models/Table";
import { FOOD, RESTAURANTS } from "../../utils/LoadImage";
import { customer } from "../../modelUI/NavbarLink";
import createFood from "../../models/Food";

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

    let restaurants = [];
    for (let index = 0; index < 4; index++) {
      const item = createRestaurant({
        name: `Cơ sở số ${index}`,
        address: `Địa chỉ số ${index}`,
        openTime: "Fri Oct 06 2023 21:10:33",
        closeTime: "Fri Oct 06 2023 21:10:33",
        description: `Ẩm thực tại Charger nổi bật với đa dạng các món ngon, đưa cuộc nhậu lên một tầm cao mới. Trong không gian hiện đại với phong cách decor camping độc đáo, âm nhạc bắt tai, Charger hứa hẹn sẽ mang đến những  trải nghiệm ăn chơi tiệc tùng đỉnh cao có 1-0-2.`,
        images: [
          `${RESTAURANTS[0]}`,
          `${RESTAURANTS[1]}`,
          `${RESTAURANTS[0]}`,
          `${RESTAURANTS[1]}`,
          `${RESTAURANTS[0]}`,
          `${RESTAURANTS[1]}`,
          `${RESTAURANTS[0]}`,
          `${RESTAURANTS[1]}`,
        ]
      });
      restaurants.push(item);
    }

    let menu = [];
    for (let index = 0; index < 50; index++) {
      const item = createFood({
        id: index,
        foodCode: index,
        img: FOOD[0],
        foodName: "Sicilian",
        category: "Piza",
        description: "",
        unit: "Chiếc",
        price: 100,
        discount: 0
      });
      menu.push(item);
    }

    let combo = [];
    for (let index = 0; index < 3; index++) {
      const item = {
        "comboCategory": "set",
        "comboName": `${randomInt(500, 200)}k`,
        "comboDescription": "Gọi thả ga, ăn thật đã",
        'comboCount': `${randomInt(100, 10)} món`,
        "comboImage": FOOD[0]
      };
      combo.push(item);
    }

    setTableList(tables);
    setRestaurants(restaurants);
    setModeTab(customer);
    setMenu(menu);
    setCombo(combo);
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
