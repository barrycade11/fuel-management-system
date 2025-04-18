import {DatePicker} from "@heroui/react";
import moment from "moment";
import { parseDate } from "@internationalized/date";

const CustomDatePicker = ({ startDate, setStartDate, label }) => {
    return (
        <div>
            <label className="text-sm text-gray-500 font-semibold">{label}</label>
            <DatePicker
                className="w-full my-2"
                label=""
                value={startDate!==null ? parseDate(moment(startDate).format('YYYY-MM-DD')) : null}
                onChange={(e)=>{
                    setStartDate(moment( new Date(e.toString()) ).format('MM/DD/YYYY'))
                }} 
            />
        </div>
    )
};  

export default CustomDatePicker;