import { Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";

export default function SimpleSelect({ label, items, passedValue, toUpdate }) {
    const [value, setValue] = useState('');
    
    useEffect(() => {
        if (passedValue !== undefined) {
            setValue(items.filter((a)=>a.id==passedValue)[0]?.description)
        }
    }, [passedValue])

    const handleSelectionChange = (e) => {
        toUpdate(items.filter((a)=>a.description==e.target.value)[0]?.id)
    };

    return (
        <div className="flex flex-col justify-between">
            <label className="text-sm text-gray-500 font-semibold">{label}</label>
            <div className="mt-2 mb-1">
                <Select
                    className="w-full"
                    selectedKeys={[value]}
                    variant="bordered"
                    labelPlacement="outside"
                    onChange={handleSelectionChange}
                    placeholder="Select"
                    classNames={{
                        value: 'font-semibold text-gray-400'
                    }}
                >
                    {items.map((item) => (
                        <SelectItem key={item?.description}>{item?.description}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}