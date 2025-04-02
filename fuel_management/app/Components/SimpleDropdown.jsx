import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import Down from "~/Assets/Svg/Down";

export default function SimpleDropdown({ label, items, toUpdate }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Select"]));
    
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys],
    );

    useEffect(()=> {
        toUpdate((Array.from(selectedKeys).join(", ").replaceAll("_", " ")))
    }, [selectedKeys])
    
    return (
        <div className="flex flex-col justify-between">
            <label className="text-sm text-gray-500 font-semibold">{label}</label>
            <div className="mt-2 mb-1">
                <Dropdown>
                    <DropdownTrigger>
                        <Button endContent={<Down color={"#6b7280"} />} className="capitalize min-w-64 w-auto flex justify-between" variant="bordered">
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        closeOnSelect={true}
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={setSelectedKeys}
                    >
                        {items.map((item) => (
                            <DropdownItem key={item}>{item}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}