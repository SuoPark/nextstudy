import { Context, useContext } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { IValueType } from "@/context/SearchListContext";
interface props {
  context: Context<IValueType>;
}

export default function BasicTable({ context }: props) {
  const searchListContext = useContext(context);
  function createData() {
    const rows: { [key: string]: any }[] = [];
    searchListContext.content.map((item) => {
      rows.push(item);
    });
    return rows;
  }
  const rows = createData();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">subject</TableCell>
            <TableCell align="right">writer&nbsp;(g)</TableCell>
            <TableCell align="right">createDate&nbsp;(g)</TableCell>
            <TableCell align="right">views&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.writer}</TableCell>
              <TableCell align="right">{row.createDate}</TableCell>
              <TableCell align="right">{row.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
