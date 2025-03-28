import { useRef, useEffect, useState } from "react";
import { SearchIcon, SettingsIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@heroui/table";
import { useAsyncList } from "@react-stately/data";

const HeroUITable = ({ title, data, columns, onAdd, onEdit, customRender }) => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const settingsButtonRef = useRef(null);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: !col.hidden }), {})
  );

  // useAsyncList handles sorting automatically
  let list = useAsyncList({
    async load() {
      return { items: data };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: [...items].sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === "descending") cmp *= -1;
          return cmp;
        }),
      };
    },
  });

  // Apply search filtering AFTER sorting
  const filteredData = list.items.filter((item) =>
    Object.keys(item).some(
      (key) =>
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(search.toLowerCase())
    )
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative flex bg-gray-100 rounded-lg px-3 py-2 w-72 border">
            <input
              type="text"
              placeholder="Search Table"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-transparent focus:outline-none"
            />
            <div className="p-1 rounded-lg">
              <SearchIcon size={18} />
            </div>
            <button
              ref={settingsButtonRef}
              onClick={() => setShowFilter((prev) => !prev)}
              className="p-1 rounded-lg hover:bg-gray-200 relative"
            >
              <SettingsIcon size={18} />
            </button>
            {showFilter && (
              <div
                ref={filterRef}
                className="absolute right-0 mt-10 w-48 bg-white shadow-lg rounded-lg p-2 z-10"
              >
                <p className="text-sm font-semibold mb-2">Columns to Display</p>
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      checked={visibleColumns[col]}
                      onChange={() =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [col]: !prev[col],
                        }))
                      }
                    />
                    <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
                    onClick={onAdd}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                + Add new
                </button>
        </div>
      </div>

      {/* Table Section */}
      <Table
        isStriped
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        aria-label="Datatable"
      >
        <TableHeader>
          {columns
            .filter((col) => visibleColumns[col.key])
            .map((col) => (
              <TableColumn key={col.key} allowsSorting>
                {col.label}
              </TableColumn>
            ))}
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              {columns
                ?.filter((col) => col && visibleColumns?.[col.key])
                ?.map((col) => (
                  <TableCell key={col.key}>
                    {(customRender && customRender[col.key] && typeof customRender[col.key] === "function")
                      ? customRender[col.key](item[col.key], item)
                      : item[col.key] ?? "-"}
                  </TableCell>
                ))}
              {customRender && customRender.actions && typeof customRender.actions === "function" && (
                <TableCell>{customRender.actions(item)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HeroUITable;
