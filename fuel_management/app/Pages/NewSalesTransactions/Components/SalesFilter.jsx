import React, { useEffect, useState } from "react";
import CustomDatePicker from "~/Components/CustomDatePicker.jsx";
import { InputMode, SampleEmployeeName } from "~/Constants/Labels.js";
import SimpleDropdown from "~/Components/SimpleDropdown.jsx";
import SimpleSelect from "~/Components/SimpleSelect";
import { fetchStations } from "~/Hooks/Setup/Station/Station/useStations";

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
    openAdd,
    shifts,
    setShifts,
    employee,
    setEmployees
}) => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchStations()
            let tempArray = []
            for (let item of result.body) {
                tempArray.push({
                    id: item.id,
                    name: item.name,
                    description: item.code
                })
            }
            setStations(tempArray)
        }
        getData()
    }, [])

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
                items={stations}
                passedValue={selectedStation}
                toUpdate={setSelectedStation}
            />
            {openAdd == true && (
                <>
                    <SimpleSelect
                        label={"Shift No."}
                        items={shifts}
                        passedValue={selectedShift}
                        toUpdate={setSelectedShift}
                    />
                    <SimpleSelect
                        label={"Created by"}
                        items={employee}
                        passedValue={selectedShiftManager}
                        toUpdate={setSelectedShiftManager}
                    />
                </>
            )}
        </div>
    );
};

export default SalesFilter;