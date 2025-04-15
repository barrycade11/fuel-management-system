import Tabs from "~/Components/Tabs";
import { SalesTabs } from "~/Constants/Labels";
import { useState, useEffect } from "react";
import Navbar from "~/Components/Navbar"
import SalesFilter from "./Components/Salesfilter";
import { DailySalesTable } from "./Pages/DailySalesTable";
import DailySalesInput from "./Pages/DailySalesInput";
import { fetchStationShifts } from "~/Hooks/Setup/Station/StationShift/useStationShifts";
import { fetchStationEmployees } from "~/Hooks/Setup/Station/StationEmployee/useStationEmployee";

const SalesTransactions = () => {
    const [activeTab, setActiveTab] = useState(SalesTabs[0]);
    const [effectivityDate, setEffectivityDate] = useState(new Date(Date.now()));
    const [selectedMode, setSelectedMode] = useState(1)
    const [selectedStation, setSelectedStation] = useState('')
    const [selectedShiftManager, setSelectedShiftManager] = useState('')
    const [selectedShift, setSelectedShift] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [editId, setEditId] = useState('');
    const [shifts, setShifts] = useState([]);
    const [employee, setEmployees] = useState([]);

    useEffect(() => {
        const getData = async () => {
            if (selectedStation !== '' && selectedStation !== undefined) {
                const result = await fetchStationShifts(selectedStation)

                let tempArray = []
                for (let item of result) {
                    tempArray.push({
                        id: item.id,
                        description: item.shift
                    })
                }
                setShifts(tempArray)
                if (selectedShift !== '' && selectedShift !== undefined) {
                    const res = await fetchStationEmployees(selectedStation, selectedShift)
                    setEmployees(res)
                }
            }
        }
        getData()
    }, [selectedStation, selectedShift])

    return (
        <>
            <Navbar
                title="Sales"
            />

            <div className="p-5 bg-white min-h-[100vh]">
                <Tabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={SalesTabs}
                />

                <SalesFilter
                    activeTab={activeTab}
                    effectivityDate={effectivityDate}
                    setEffectivityDate={setEffectivityDate}
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                    selectedShiftManager={selectedShiftManager}
                    setSelectedShiftManager={setSelectedShiftManager}
                    selectedShift={selectedShift}
                    setSelectedShift={setSelectedShift}
                    openAdd={openAdd}
                    shifts={shifts}
                    setShifts={setShifts}
                    employee={employee}
                    setEmployees={setEmployees}
                />

                {activeTab === "Daily Sales Input" && (
                    <>
                        {openAdd === true ?
                            <DailySalesInput
                                editId={editId}
                                setOpenAdd={setOpenAdd}
                                selectedMode={selectedMode}
                                effectivityDate={effectivityDate}
                                selectedStation={selectedStation}
                                selectedShiftManager={selectedShiftManager}
                                selectedShift={selectedShift}
                                employee={employee}
                            />
                            :
                            <DailySalesTable
                                openAdd={openAdd}
                                setOpenAdd={setOpenAdd}
                                effectivityDate={effectivityDate}
                                selectedMode={selectedMode}
                                selectedStation={selectedStation}
                                selectedShiftManager={selectedShiftManager}
                                selectedShift={selectedShift}
                                setEditId={setEditId}
                            />
                        }
                    </>
                )}

                {activeTab === "Upload POS" && (
                    <>
                    </>
                )}
            </div>
        </>
    )

}

export default SalesTransactions;
