import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import { useState } from "react";

const columns = [
  {
    accessorKey: 'task',
    header: "Task",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'status',
    header: "Status",
    cell: (props) => <p>{props.getValue()?.name}</p>
  },
  {
    accessorKey: 'due',
    header: "Due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>
  },
  {
    accessorKey: 'notes',
    header: "Notes",
    cell: (props) => <p>{props.getValue()}</p>
  },

]

const TaskTable = () => {
  const [data, setData] = useState(DATA)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  // console.log(table.getRowModel().rows[0].getVisibleCells()[0])
  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map(headerGroup => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th"  w={header.getSize()}  key={header.id}>
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>))}
        {table.getRowModel().rows.map(row_table => (<Box className="tr" key={row_table.id}>
          {row_table.getVisibleCells().map(cell => (<Box className="td" w= {cell.column.getSize()} key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Box>
          ))}
        </Box>
        ))}

      </Box>
    </Box>
  );
};
export default TaskTable;
