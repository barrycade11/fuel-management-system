import { useEffect, useState } from "react";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Dropdown = ({ typeId, value, onChange }) => {
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
    }
  }, [value, typeId]);

  return (
    <select 
      value={value || ""} 
      onChange={onChange} 
      className="w-full mb-2 p-2 border rounded"
      required
    >
      <option value="">{selectedValue || "Select an option"}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
