import { useRef, useEffect, useState } from "react";
import { SearchIcon, SettingsIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell, 
  Button, 
  Input,
  Autocomplete, 
  AutocompleteItem
} from "@heroui/react";
import Plus from "~/Assets/Svg/Plus";
import { DropdownType } from "~/Constants/Enums";
import { useAsyncList } from "@react-stately/data";

const HeroUITable = ({ 
  title, 
  data, 
  columns, 
  onAdd, 
  onEdit, 
  customRender, 
  selectedDropdownKey, 
  setSelectedDropdownKey 
}) => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const dropdownOptions = Object.entries(DropdownType)
    .filter(([key, value]) => !isNaN(Number(value))) 
    .map(([key, value]) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(), 
      key: value.toString(),
  }));
  const selectedLabel = dropdownOptions.find((opt) => opt.key === selectedDropdownKey)?.label || title;
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: !col.hidden }), {})
  );

  useEffect(() => {
    console.log("selectedDropdownKey:", selectedDropdownKey);
    console.log("selectedLabel:", selectedLabel);
  }, [selectedDropdownKey]);

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
      <div className="flex justify-between items-center gap-3 mb-4 ">
        <h2 className="text-xl font-semibold">{selectedLabel}</h2>
        <Autocomplete
          className="max-w-xs"
          defaultItems={dropdownOptions}
          label="Dropdown Type"
          placeholder="Search an option"
          size="sm"
          selectedKey={selectedDropdownKey}
          onSelectionChange={(key) => setSelectedDropdownKey(key)}
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <div className="flex items-center space-x-2">
          <div className="relative flex w-72">
            <Input 
              className="flex-grow bg-transparent focus:outline-none" 
              placeholder="Search Table"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              endContent={
                <>
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
               </>
              }
            />
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
          <Button onClick={onAdd} color="primary">
            <Plus color="#ffffff" />
            <span className="text-[18px]">Add new</span>
          </Button>
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
