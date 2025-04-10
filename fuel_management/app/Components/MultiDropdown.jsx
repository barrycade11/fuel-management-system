import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const MultiDropdown = ({ typeId, value, onChange, label, labelPlacement = "outside" }) => {
  const [options, setOptions] = useState([]); // Stores all dropdown options
  const [selectedValues, setSelectedValues] = useState([]); // Stores selected items {id, name}
  const [selectedKeys, setSelectedKeys] = useState(new Set([])); // Stores selected item IDs
  const [isOpen, setIsOpen] = useState(false); // Dropdown state

  // 🔹 Fetch dropdown options when typeId changes
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchDropdowns(typeId);
        setOptions(data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    if (typeId) fetchOptions();
  }, [typeId]);

  // 🔹 Handle setting selected values when `value` or `options` change
  useEffect(() => {
    if (!value || value.length === 0) {
      setSelectedValues([]);
      setSelectedKeys(new Set([]));
      return;
    }

    const valueArray = Array.isArray(value) ? value : [value]; // Ensure array format
    setSelectedKeys(new Set(valueArray.map(id => id.toString())));

    // ✅ If options are available, use them directly
    const matchedOptions = options.filter(option => 
      valueArray.includes(option.id) || valueArray.includes(option.id.toString())
    );

    if (matchedOptions.length > 0) {
      setSelectedValues(matchedOptions);
      return;
    }

    // 🔹 Otherwise, fetch selected values from API
    const fetchSelectedValues = async () => {
      try {
        console.log("Fetching selected values for typeId:", typeId, "with IDs:", valueArray);

        const results = await Promise.all(
          valueArray.map(async (id) => {
            try {
              const result = await fetchDropdownTypeList(typeId, id);
              return result;
            } catch (err) {
              console.error(`Error fetching ID ${id}:`, err);
              return null;
            }
          })
        );

        const validResults = results.filter(Boolean);
        setSelectedValues(validResults);
      } catch (error) {
        console.error("Error fetching selected values:", error);
      }
    };

    fetchSelectedValues();
  }, [value, options, typeId]);

  // 🔹 Handle selection change
  const handleSelectionChange = (keys) => {
    const selectedArray = Array.from(keys);
    setSelectedKeys(new Set(selectedArray));

    // ✅ Update selected values immediately from options
    const newSelectedValues = options.filter(option =>
      selectedArray.includes(option.id.toString())
    );
    setSelectedValues(newSelectedValues);

    if (onChange) {
      onChange({ target: { value: selectedArray.map(key => parseInt(key, 10) || key) } });
    }
  };

  return (
    <div className="w-full mb-2">
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
        <DropdownTrigger>
          <Button className="w-full justify-between min-h-[56px] bg-default-100 text-left px-3 py-2">
            <div className="flex flex-col items-start w-full">
              {label && <span className="text-xs text-foreground-700 mb-1">{label}</span>}
              <div className="flex flex-wrap gap-2 w-full">
                {selectedValues.length > 0 ? (
                  selectedValues.map((item) => (
                    <Chip key={item.id} className="my-0.5">{item.name}</Chip>
                  ))
                ) : (
                  <span className="text-foreground-400">Select options</span>
                )}
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={label || "Dropdown menu"}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          closeOnSelect={false}
          disallowEmptySelection={false}
        >
          {options.map((option) => (
            <DropdownItem key={option.id.toString()} textValue={option.name}>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MultiDropdown;
