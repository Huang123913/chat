import { useState } from "react";

import { BrotherComContext } from "./BrotherComContext";

export const BrotherComContextProvider = (props: { children: any }) => {
  const [sessionItem, setSessionItem] = useState({});
  const [tableData, setTableData] = useState([]);

  return (
    <BrotherComContext.Provider
      value={{
        sessionItem,
        setSessionItem,
        tableData,
        setTableData,
      }}
    >
      {props.children}
    </BrotherComContext.Provider>
  );
};
