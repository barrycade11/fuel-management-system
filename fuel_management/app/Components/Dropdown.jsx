import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList, fetchCustomDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Dropdown = ({ typeId, value, customOptions, onChange, label }) => {
  const [options, setOptions] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selectedValues, setSelectedValues] = useState([]);

  // Fetch options based on typeId or use customOptions
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

  // Handle selected value
  useEffect(() => {
    if (!value) {
      setSelectedKeys(new Set([]));
      setSelectedValues([]);
      return;
    }

    const valueString = value.toString();
    setSelectedKeys(new Set([valueString]));

    // Handle different data sources for selected value
    if (customOptions && customOptions.length > 0) {
      // Use fetchCustomDropdownTypeList for custom options
      const matchedCustomOptions = fetchCustomDropdownTypeList(customOptions, [valueString]);
      if (matchedCustomOptions.length > 0) {
        setSelectedValues(matchedCustomOptions);
      }
    } else if (typeId) {
      // Use fetchDropdownTypeList for API data with typeId
      const fetchSelectedValue = async () => {
        try {
          const data = await fetchDropdownTypeList(typeId, value);
          if (data) setSelectedValues([data]);
        } catch (error) {
          console.error("Error fetching selected value:", error);
        }
      };
      fetchSelectedValue();
    }
  }, [value, customOptions, typeId]);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    
    if (onChange) {
      const selectedKey = Array.from(keys)[0];
      onChange({ 
        target: { 
          value: selectedKey || "" 
        } 
      });
    }
  };

  return (
    <Select 
      label={label}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      placeholder="Select an option"
      className="w-full mb-2"
      isRequired
      selectionMode="single"
      aria-label={selectedValues.length > 0 ? selectedValues[0].name : "Select dropdown"}
    >
      {options.map((option) => (
        <SelectItem key={option.id.toString()} textValue={option.name}>
          {option.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Dropdown;