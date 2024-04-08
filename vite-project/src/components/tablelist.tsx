import { useContext } from "react";

import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";

import { BrotherComContext } from "./BrotherComContext";
import MessagesPaneHeader from "./MessagesPaneHeader";

export default function Tablelist() {
  const { sessionItem, tableData } = useContext(BrotherComContext);
  const { data, headerData } = tableData;

  return (
    <Sheet
      sx={{
        display: sessionItem?.id ? "block" : "none",
        width: "60%",
        minHeight: 0,
        pt: 2.4,
        pl: 1,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <MessagesPaneHeader sessionItem={sessionItem} />
      <Sheet
        variant="outlined"
        sx={{
          height: "calc(100dvh - 120px)",
          width: "100%",
          overflow: "auto",
          display: data?.length ? "block" : "none",
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              {headerData?.map((item: any) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr key={item[headerData[0]]}>
                {headerData?.map((item1: any, index: number) => (
                  <td key={index}>{item[item1]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Sheet>
  );
}
