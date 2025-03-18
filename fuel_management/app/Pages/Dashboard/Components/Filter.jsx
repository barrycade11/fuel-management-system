import React, { useState } from "react";
import CustomDatePicker from "../../../Components/CustomDatePicker";
import MultiSelectDropdown from "~/Components/MultiSelectDropdown";

const DashboardFilter = () => {
    const [startDate, setStartDate] = useState(null);
    
    return (
        <div className="flex gap-2 my-4 items-center">
            <CustomDatePicker   
                label={"Period Start Date"}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <CustomDatePicker   
                label={"Period End Date"}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <MultiSelectDropdown 
                label={"Station"}
            />
        </div>
    );
};

export default DashboardFilter;