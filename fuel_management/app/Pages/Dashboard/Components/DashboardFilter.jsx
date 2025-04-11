import React, { useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import MultiSelectDropdown from "~/Components/MultiSelectDropdown";

const DashboardFilter = ({activeTab, startDate, setStartDate, endDate, setEndDate}) => {
    
    return (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 gap-2 my-4 items-center px-5">
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