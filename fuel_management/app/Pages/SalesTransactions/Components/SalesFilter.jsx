import React, { useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import { Locations, SampleEmployeeName, Shifts } from "~/Constants/Labels.js";
import SimpleDropdown from "~/Components/SimpleDropdown.jsx";
import SimpleSelect from "~/Components/SimpleSelect";

const SalesFilter = ({
    activeTab, 
    effectivityDate, 
    setEffectivityDate,
    setSelectedStation,
    setSelectedShiftManager,
    setSelectedShift
}) => {
    
    return (
        <div className="lg:grid-cols-4 grid grid-cols-2 lg:gap-4 my-4 items-center">
            <CustomDatePicker   
                label={"Effectivity Date"}
                startDate={effectivityDate}
                setStartDate={setEffectivityDate}
            />

            <SimpleSelect
                label={"Station"}
                items={Locations}
                toUpdate={setSelectedStation}
            />

            <SimpleSelect
                label={"Shift Manager"}
                items={SampleEmployeeName}
                toUpdate={setSelectedShiftManager}
            />

            <SimpleSelect
                label={"Shift No."}
                items={Shifts}
                toUpdate={setSelectedShift}
            />
        </div>
    );
};

export default SalesFilter;