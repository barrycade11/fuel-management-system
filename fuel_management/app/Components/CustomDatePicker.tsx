import {DatePicker} from "@heroui/react";

const CustomDatePicker = ({ startDate, setStartDate, label }) => {
    return (
        <div className="p-2">
            <label className="text-sm text-gray-400">{label}</label>
            <DatePicker
                className="w-48 my-2"
                label=""
                value={startDate}
                onChange={setStartDate} 
            />
        </div>
    )
};  

export default CustomDatePicker;