import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
//import MOCK_DATA from ".././database/db.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { COLUMNS } from "./OxygenColumns";

//const baseURL = "https://3x2wq-3000.sse.codesandbox.io/sugar_data";
const baseURL = "https://suoxappbackend.herokuapp.com/api/oxygen";
const ViewOxygenData = () => {
  const [dataSource, SetDataSource] = useState([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      SetDataSource(response.data);
    });
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataSource, [dataSource]);
  const tableInstance = useTable({
    columns,
    data
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        {...getTableProps()}
      >
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ViewOxygenData;
