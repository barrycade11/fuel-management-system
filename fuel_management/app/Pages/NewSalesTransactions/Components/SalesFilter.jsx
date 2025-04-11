import React, { useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import { InputMode, Locations, SampleEmployeeName, Shifts } from "~/Constants/Labels.js";
import SimpleDropdown from "~/Components/SimpleDropdown.jsx";
import SimpleSelect from "~/Components/SimpleSelect";

const SalesFilter = ({
    activeTab,
    effectivityDate,
    setEffectivityDate,
    selectedMode,
    setSelectedMode,
    selectedStation,
    setSelectedStation,
    selectedShiftManager,
    setSelectedShiftManager,
    selectedShift,
    setSelectedShift,
    openAdd
}) => {

    return (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 gap-2 my-4 items-center">
            {openAdd == true && (
                <SimpleSelect
                    label={"Input Mode"}
                    items={InputMode}
                    passedValue={selectedMode}
                    toUpdate={setSelectedMode}
                />
            )}

            <CustomDatePicker
                label={"Effectivity Date"}
                startDate={effectivityDate}
                setStartDate={setEffectivityDate}
            />

            <SimpleSelect
                label={"Station"}
                items={Locations}
                passedValue={selectedStation}
                toUpdate={setSelectedStation}
            />
            {openAdd == true && (
                <>
                    <SimpleSelect
                        label={"Shift No."}
                        items={Shifts}
                        passedValue={selectedShift}
                        toUpdate={setSelectedShift}
                    />
                    <SimpleSelect
                        label={"Created by"}
                        items={SampleEmployeeName}
                        passedValue={selectedShiftManager}
                        toUpdate={setSelectedShiftManager}
                    />
                </>
            )}
        </div>
    );
};

export default SalesFilter;