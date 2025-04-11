import Tabs from "~/Components/Tabs";
import { SalesTabs } from "~/Constants/Labels";
import { useState } from "react";
import Navbar from "~/Components/Navbar"
import SalesFilter from "./Components/Salesfilter";
import { DailySalesTable } from "./Pages/DailySalesTable";
import DailySalesInput from "./Pages/DailySalesInput";

const SalesTransactions = () => {
    const [activeTab, setActiveTab] = useState(SalesTabs[0]);
    const [effectivityDate, setEffectivityDate] = useState(new Date(Date.now()));
    const [selectedMode, setSelectedMode] = useState(1)
    const [selectedStation, setSelectedStation] = useState('')
    const [selectedShiftManager, setSelectedShiftManager] = useState('')
    const [selectedShift, setSelectedShift] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [editId, setEditId] = useState('');

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
