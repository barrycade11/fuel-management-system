import React, { useState } from "react";
import CustomDatePicker from "../../../Components/CustomDatePicker.jsx";
import MultiSelectDropdown from "~/Components/MultiSelectDropdown";

const DashboardFilter = ({activeTab, startDate, setStartDate, endDate, setEndDate}) => {
    
    return (
        <div className="flex gap-2 my-4 items-center">
            <CustomDatePicker   
                label={"Period Start Date"}
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <CustomDatePicker   
                label={"Period End Date"}
                startDate={endDate}
                setStartDate={setEndDate}
            />

            {activeTab=="PMDTR" || activeTab=="Navigator" ? 
                null
            :
                <MultiSelectDropdown 
                    label={"Station"}
                />
            }
        </div>
    );
};

export default DashboardFilter;