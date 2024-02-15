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
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString"
  },
  {
    accessorKey: 'status',
    header: "Status",
    cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.lenght === 0) return true
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id)
    }
  },
  {
    accessorKey: 'due',
    header: "Due",
    cell: DateCell
  },
  {
    accessorKey: 'notes',
    header: "Notes",
    size: 225,
    cell: EditableCell
  },

]

const TaskTable = () => {
  const [data, setData] = useState(DATA)
  const [columnFilters, setColumnFilters] = useState([])
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination:{
        pageSize:10,
        pageIndex: 0
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) => setData(
        prev => prev.map((row, index) =>
          index === rowIndex ? {
            ...prev[rowIndex],
            [columnId]: value,
          } : row
        )
      )
    }
  })
  console.log(data)
  return (
    <Box>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />

      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map(headerGroup => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {
                  header.column.getCanSort() && <Icon as={SortIcon} mx={3} fontSize={14}
                    onClick={header.column.getToggleSortingHandler()}
                  />
                }
                {
                  {
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()]
                  
                }
                <Box
                  onMouseDown={
                    header.getResizeHandler()
                  }
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""
                    }`}>

                </Box>
              </Box>
            ))}
          </Box>))}
        {table.getRowModel().rows.map(row_table => (<Box className="tr" key={row_table.id}>
          {row_table.getVisibleCells().map(cell => (<Box className="td" w={cell.column.getSize()} key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Box>
          ))}
        </Box>
        ))}

      </Box>
      <Text mb={2}>
        <br />
        Page 
       {table.getState().pagination.pageIndex + 1}of {" "}        
       {table.getPageCount()}      
      </Text>

      <ButtonGroup size="sm" isAttached variant="outline">
        <Button onClick={() =>table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
          {"<"}
        </Button>
        <Button onClick={() =>table.nextPage()} isDisabled={!table.getCanNextPage()}>
          {">"}
        </Button>
      </ButtonGroup>
    </Box>
  );
};
export default TaskTable;
