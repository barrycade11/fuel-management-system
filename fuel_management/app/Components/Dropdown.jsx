import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Dropdown = ({ typeId, value, onChange, label }) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchDropdowns(typeId);
        setOptions(data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchOptions();
  }, [typeId]);

  useEffect(() => {
    if (value) {
      const fetchSelectedValue = async () => {
        try {
          const data = await fetchDropdownTypeList(typeId, value);
          setSelectedValue(data?.name || ""); 
        } catch (error) {
          console.error("Error fetching selected value:", error);
        }
      };

      fetchSelectedValue();
    } else {
      setSelectedValue("");
    }
  }, [typeId, value]);

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    if (onChange) {
      onChange({ target: { value: selectedKey } });
    }
  };

  return (
    <Select 
      label={label}
      selectedKeys={value ? [value.toString()] : []}
      onSelectionChange={handleSelectionChange}
      placeholder="Select an option"
      className="w-full mb-2"
      isRequired
      aria-label={selectedValue || "Select dropdown"}
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