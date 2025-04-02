import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function SimpleSelect({ label, items, toUpdate }) {
    const [value, setValue] = useState('');

    const handleSelectionChange = (e) => {
        toUpdate(e.target.value)
        setValue(e.target.value);
    };

    return (
        <div className="flex flex-col justify-between">
            <label className="text-sm text-gray-500 font-semibold">{label}</label>
            <div className="mt-2 mb-1">
                <Select
                    className="max-w-xs"
                    selectedKeys={[value]}
                    variant="bordered"
                    labelPlacement="outside"
                    onChange={handleSelectionChange}
                    placeholder="Select"
                >
                    {items.map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}