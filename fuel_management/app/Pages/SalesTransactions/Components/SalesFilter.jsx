import React, { useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import { Locations, SampleEmployeeName, Shifts } from "~/Constants/Labels.js";
import SimpleDropdown from "~/Components/SimpleDropdown.jsx";

const SalesFilter = ({activeTab, effectivityDate, setEffectivityDate}) => {
    
    return (
        <div className="flex gap-2 my-4 items-center">
            <CustomDatePicker   
                label={"Effectivity Date"}
                startDate={effectivityDate}
                setStartDate={setEffectivityDate}
            />

            <SimpleDropdown
                label={"Station"}
                items={Locations}
            />

            <SimpleDropdown
                label={"Shift Manager"}
                items={SampleEmployeeName}
            />

            <SimpleDropdown
                label={"Shift No."}
                items={Shifts}
            />
        </div>
    );
};

export default SalesFilter;