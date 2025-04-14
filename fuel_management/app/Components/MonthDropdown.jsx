import { Select, SelectItem } from "@heroui/react";

const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
];

export default function MonthDropdown({ selectedMonthId, onChange }) {
    return (
        <Select
            label="Select Month"
            selectedKeys={selectedMonthId ? [selectedMonthId] : []}
            onChange={(e) => onChange(e.target.value)}
            isRequired
        >
            {months.map((month) => (
                <SelectItem key={month.id} value={month.id}>
                    {month.name}
                </SelectItem>
            ))}
        </Select>
    );
}
