import re

with open('frontend/features/tasks/components/data-table.tsx', 'r') as f:
    content = f.read()

# 1. Remove DragHandle
content = re.sub(r'// Create a separate component for the drag handle.*?}\n', '', content, flags=re.DOTALL)

# 2. Update columns array: remove drag and select, and remove actions
# We will just redefine the columns array.
columns_start = content.find('const columns: ColumnDef<TaskItem>[] = [')
columns_end = content.find(']', columns_start) + 1
old_columns_str = content[columns_start:columns_end]

# It's safer to just remove the specific blocks using string replacement
content = content.replace('''  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
''', '')

content = content.replace('''  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
''', '')

# 3. Remove DraggableRow
content = re.sub(r'function DraggableRow.*?}\n', '', content, flags=re.DOTALL)

# 4. Remove dnd-kit imports
content = re.sub(r'import {\n  DndContext,\n  KeyboardSensor,\n  MouseSensor,\n  TouchSensor,\n  closestCenter,\n  useSensor,\n  useSensors,\n  type DragEndEvent,\n  type UniqueIdentifier,\n} from "@dnd-kit/core"\nimport { restrictToVerticalAxis } from "@dnd-kit/modifiers"\nimport {\n  SortableContext,\n  arrayMove,\n  useSortable,\n  verticalListSortingStrategy,\n} from "@dnd-kit/sortable"\nimport { CSS } from "@dnd-kit/utilities"\n', '', content)
content = re.sub(r'import { CSS } from "@dnd-kit/utilities"\n', '', content)

# 5. Simplify DataTable return
return_start = content.find('  return (\n    <Tabs')
return_end = content.find('    </Tabs>\n  )') + 14

new_return = '''  return (
    <div className="w-full flex-col justify-start gap-4 flex">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold tracking-tight px-1">Tasks</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl">
                <IconLayoutColumns className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Columns</span>
                <IconChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select
            onValueChange={(value) => {
              switch (value) {
                case "priority-low":
                  setSorting([{ id: "priority", desc: false }])
                  break
                case "priority-high":
                  setSorting([{ id: "priority", desc: true }])
                  break
                case "due-date":
                  setSorting([{ id: "dueDate", desc: false }])
                  break
                case "status":
                  setSorting([{ id: "status", desc: false }])
                  break
              }
            }}
          >
            <SelectTrigger className="w-[160px] rounded-xl" size="sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="priority-low">Priority: Low to High</SelectItem>
              <SelectItem value="priority-high">Priority: High to Low</SelectItem>
              <SelectItem value="due-date">Due Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex px-1">
          {table.getFilteredRowModel().rows.length} total task(s).
        </div>
        <div className="flex w-full items-center justify-end gap-6 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex rounded-lg"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 rounded-lg"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 rounded-lg"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>  
              <IconChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex rounded-lg"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )'''

content = content[:return_start] + new_return + content[return_end:]

with open('frontend/features/tasks/components/data-table.tsx', 'w') as f:
    f.write(content)
