import React, { useContext, useEffect, useState } from "react";
import TableContext from "./TableContext";
import { useSearchParams } from "react-router-dom";
import { param } from "../QueryParam";
import AppContext from "../AppContext/AppContext";
import tableAPI from "../../apis/tableAPI";
import { getIdByRestaurantName } from "../../utils/TableUtil";

const TableState = ({ children }) => {
  const { restaurants, selectRestaurant, setRequestError } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurantsId, setRestaurantsId] = useState(null);
  const [tableMap, seTableMap] = useState([]);

  useEffect(() => {
    const restaurantsId = getIdByRestaurantName(restaurants, searchParams.get(param.restaurants));
    setRestaurantsId(restaurantsId);

    searchParams.delete(param.time);
    searchParams.delete(param.selectTable);
    setSearchParams(searchParams);

  }, [selectRestaurant]);

  const getAllTable = async () => {
    try {
      const response = await tableAPI.getAll();

      if (response.data.success) {
        return response.data.data;
      }
      setRequestError(false);
    } catch (error) {
      setRequestError(true);
      return [];
    }
  };

  const getAllTableByRestaurant = async (restaurantsId) => {
    try {
      const response = await tableAPI.getByRestaurantId(restaurantsId);

      if (response.data.success) {
        return response.data.data;
      }
      setRequestError(false);
    } catch (error) {
      setRequestError(true);
      return [];
    }
  };

  return (
    <TableContext.Provider
      value={{
        restaurantsId,
        getAllTable, getAllTableByRestaurant,
        tableMap, seTableMap
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableState;
