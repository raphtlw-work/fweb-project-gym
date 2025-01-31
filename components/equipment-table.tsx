"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Equipment } from "@/lib/schema";
import { format, parseISO } from "date-fns";
import { calculateEquipmentHealth } from "@/lib/equipment";
import { EditEquipmentModal } from "./edit-equipment-modal";

export function EquipmentTable({ data }: { data: Equipment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [editEquipment, setEditEquipment] = React.useState<Equipment | null>(
    null
  );

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button variant='ghost' onClick={() => column.toggleSorting()}>
              Name
              {column.getIsSorted() ? (
                column.getIsSorted() === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : (
                <ArrowUpDown className='ml-2 h-4 w-4' />
              )}
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "maintenanceDate",
        header: "Next Maintenance",
        cell: ({ row }) => (
          <div>
            {new Date(row.getValue("maintenanceDate")).toLocaleDateString()}
          </div>
        ),
      },
      {
        accessorKey: "health",
        header: ({ column }) => {
          return (
            <Button variant='ghost' onClick={() => column.toggleSorting()}>
              Health
              {column.getIsSorted() ? (
                column.getIsSorted() === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : (
                <ArrowUpDown className='ml-2 h-4 w-4' />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const equipment = row.original;
          const health = calculateEquipmentHealth(
            equipment.lastMaintainedAt,
            equipment.maintenanceDate
          );
          return (
            <div className='flex items-center'>
              <span
                className={`mr-2 font-medium ${
                  health >= 90
                    ? "text-green-600"
                    : health >= 70
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {health}%
              </span>
              <div className='w-16 h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className={`h-full ${
                    health >= 90
                      ? "bg-green-600"
                      : health >= 70
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${health}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "lastMaintainedAt",
        header: "Last Maintained",
        cell: ({ row }) => (
          <div>{format(row.getValue("lastMaintainedAt"), "PPP")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const equipment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(equipment.id)}
                >
                  Copy equipment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View maintenance history</DropdownMenuItem>
                <DropdownMenuItem>Schedule maintenance</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEditEquipment(equipment)}>
                  Update equipment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter equipment...'
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {editEquipment && (
        <EditEquipmentModal
          equipment={editEquipment}
          onClose={() => setEditEquipment(null)}
        />
      )}
    </div>
  );
}
