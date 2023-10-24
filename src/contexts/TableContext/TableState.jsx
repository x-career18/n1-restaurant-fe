import React, { useEffect, useState } from "react";
import TableContext from "./TableContext";
import { useSearchParams } from "react-router-dom";
import { param } from "../QueryParam";

const TableState = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    searchParams.delete(param.selectTable);
    setSearchParams(searchParams);
  }, []);

  console.log("TableState")
  return (
    <TableContext.Provider
      value={{
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableState;
