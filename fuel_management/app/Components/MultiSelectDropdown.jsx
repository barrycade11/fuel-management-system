import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useMemo, useState } from "react";
import { Locations } from "~/Constants/Labels";

export default function MultiSelectDropdown(props) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Select"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys],
    );

    return (
        <div className="flex flex-col justify-between p-2 ">
            <label className="text-sm text-gray-400">{props.label}</label>
            <div className="mt-2 mb-1">
            <Dropdown>
                <DropdownTrigger>
                    <Button className="capitalize min-w-64 w-auto" variant="bordered">
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Multiple selection example"
                    closeOnSelect={false}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    variant="flat"
                    onSelectionChange={setSelectedKeys}
                >
                    {Locations.map((item) => (
                        <DropdownItem key={item}>{item}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            </div>
        </div>
    );
}