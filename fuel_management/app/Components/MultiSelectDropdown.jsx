import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useMemo, useState } from "react";
import Down from "~/Assets/Svg/Down";
import { Locations } from "~/Constants/Labels";

export default function MultiSelectDropdown({label}) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Select"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys],
    );

    return (
        <div className="flex flex-col justify-between">
            <label className="text-sm text-gray-400">{label}</label>
            <div className="">
            <Dropdown>
                <DropdownTrigger>
                    <Button endContent={<Down color={"#6b7280"} />} className="capitalize min-w-64 w-auto flex justify-between" variant="bordered">
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
                        <DropdownItem key={item.description}>{item.description}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            </div>
        </div>
    );
}
