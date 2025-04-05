import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList, fetchCustomDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const MultiDropdown = ({ typeId, customOptions, initialSelectedValues = [], value, onChange, label, labelPlacement = "outside" }) => {
  const [options, setOptions] = useState([]); 
  const [selectedValues, setSelectedValues] = useState([]); 
  const [selectedKeys, setSelectedKeys] = useState(new Set([])); 
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    if (customOptions && customOptions.length > 0) {
      setOptions(customOptions);
    } else if (typeId) {
      const fetchOptions = async () => {
        try {
          const data = await fetchDropdowns(typeId);
          setOptions(data);
        } catch (error) {
          console.error("Error fetching dropdown options:", error);
        }
      };
      fetchOptions();
    }
  }, [typeId, customOptions]);

  useEffect(() => {
    if (initialSelectedValues && initialSelectedValues.length > 0) {
      // console.log(initialSelectedValues);
      setSelectedValues(initialSelectedValues);
      setSelectedKeys(new Set(initialSelectedValues.map(item => item.id.toString())));
    }
  }, [initialSelectedValues]);

  useEffect(() => {
    if (!value || value.length === 0) {
      setSelectedValues([]);
      setSelectedKeys(new Set([]));
      return;
    }

    const valueArray = Array.isArray(value) ? value : [value];
    // console.log(valueArray);
    
    setSelectedKeys(new Set(valueArray.map(id => id.toString())));

    if (options.length > 0) {
      const valueStrings = valueArray.map(id => id.toString());
      
      const matchedOptions = options.filter(option => 
        valueStrings.includes(option.id.toString())
      );
      
      // console.log(matchedOptions);
      
      if (matchedOptions.length === valueArray.length) {
        setSelectedValues(matchedOptions);
        return;
      }
    }

    if (customOptions && customOptions.length > 0) {
      const matchedCustomOptions = fetchCustomDropdownTypeList(customOptions, valueArray);
      // console.log(matchedCustomOptions);
      
      if (matchedCustomOptions.length > 0) {
        setSelectedValues(matchedCustomOptions);
        return;
      }
    } else if (typeId) {
      const fetchSelectedValues = async () => {
        try {
          // console.log(typeId, valueArray);
          
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
          // console.log(validResults);
          
          if (validResults.length > 0) {
            setSelectedValues(validResults);
          }
        } catch (error) {
          console.error("Error fetching selected values:", error);
        }
      };

      fetchSelectedValues();
    }
  }, [value, options, typeId, customOptions]);

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
            <div className="flex flex-col items-start w-full overflow-hidden">
              {label && <span className="text-xs text-foreground-700 mb-1">{label}</span>}
              <div className="flex flex-wrap gap-1 w-full overflow-visible">
                {selectedValues.length > 0 ? (
                  selectedValues.map((item) => (
                    <Chip key={item.id} className="my-0.5 max-w-full">
                      {item.name || item.applicability || `ID: ${item.id}`}
                    </Chip>
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