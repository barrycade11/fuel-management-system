import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const MultiDropdown = ({ typeId, value, onChange, label, labelPlacement = "outside" }) => {
  const [options, setOptions] = useState([]); 
  const [selectedValues, setSelectedValues] = useState([]); 
  const [selectedKeys, setSelectedKeys] = useState(new Set([])); 
  const [isOpen, setIsOpen] = useState(false); 

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

  useEffect(() => {
    if (!value || value.length === 0) {
      setSelectedValues([]);
      setSelectedKeys(new Set([]));
      return;
    }
  
    const valueArray = Array.isArray(value) ? value : [value];
    setSelectedKeys(new Set(valueArray.map(id => id.toString())));
  
    if (options.length > 0) {
      const matchedOptions = options.filter(option => 
        valueArray.includes(option.id) || 
        valueArray.includes(option.id.toString()) ||
        valueArray.includes(option.subDepartmentId) 
      );
  
      if (matchedOptions.length > 0) {
        setSelectedValues(matchedOptions);
        return;
      }
    }
  
    const fetchSelectedValues = async () => {
      try {
        console.log("Fetching selected values for typeId:", typeId, "with IDs:", valueArray);
        
        const results = await Promise.all(
          valueArray.map(async (id) => {
            try {
              const result = await fetchDropdownTypeList(typeId, id);
              return Array.isArray(result) && result.length > 0 ? result[0] : result;
            } catch (err) {
              console.error(`Error fetching ID ${id}:`, err);
              return null;
            }
          })
        );
  
        const validResults = results.filter(Boolean);
        console.log("Fetched selected values:", validResults);
        setSelectedValues(validResults);
      } catch (error) {
        console.error("Error fetching selected values:", error);
      }
    };
  
    fetchSelectedValues();
  }, [value, options, typeId]);

  const handleSelectionChange = (keys) => {
    const selectedArray = Array.from(keys);
    setSelectedKeys(new Set(selectedArray));

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
        <Button 
          className="w-full justify-between bg-default-100 text-left px-3 py-2"
          style={{ 
            height: "auto", 
            minHeight: "56px",
            whiteSpace: "normal" 
          }}
        >
            <div className="flex flex-col items-start w-full">
              {label && <span className="text-xs text-foreground-700 mb-1">{label}</span>}
              <div className="flex flex-wrap gap-1 w-full">
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
