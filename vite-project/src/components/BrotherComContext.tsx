import { createContext } from "react";

export const BrotherComContext = createContext({
  sessionItem: {}, //展示的会话信息
  setSessionItem: (param: any) => {},
  tableData: [{}], //表格数据
  setTableData: (param: any) => {},
});
