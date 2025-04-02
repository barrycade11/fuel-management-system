import React, { useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import MultiSelectDropdown from "~/Components/MultiSelectDropdown";

const DashboardFilter = ({activeTab, startDate, setStartDate, endDate, setEndDate}) => {
    
    return (
        <div className="md:flex grid grid-cols-2 gap-4 my-4 px-5 items-center">
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

            {activeTab=="PMTDR" || activeTab=="Navigator" ? 
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