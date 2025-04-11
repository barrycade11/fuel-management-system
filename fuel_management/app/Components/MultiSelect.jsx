import { Select, SelectItem } from "@heroui/react";
import { useEffect, useState, useMemo } from "react";

export default function MultiSelect({ label, items, passedValue, toUpdate }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Select"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys],
    );

    return (
        <div className="flex flex-col justify-between">
            <label className="text-sm text-gray-500 font-semibold">{label}</label>
            <div className="mt-2 mb-1">
                <Select
                    className="w-full"
                    selectedKeys={[selectedKeys]}
                    variant="bordered"
                    labelPlacement="outside"
                    onChange={setSelectedKeys}
                    placeholder="Select"
                    selectionMode="multiple"
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