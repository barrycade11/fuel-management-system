import Tabs from "~/Components/Tabs";
import { SalesTabs } from "~/Constants/Labels";
import { useState } from "react";
import Navbar from "~/Components/Navbar"
import SalesFilter from "./Components/Salesfilter";
import DailySales from "./Pages/DailySales";
import UploadPOS from "./Pages/UploadPOS";

const SalesTransactions = () => {
    const [activeTab, setActiveTab] = useState(SalesTabs[0]);
    const [effectivityDate, setEffectivityDate] = useState(null);
    const [openModeOfPayments, setOpenModeOfPayments] = useState(false);
    const [openDepSales, setOpenDepSales] = useState(false);
    const [openSupplements, setOpenSupplements] = useState(false);
    const [openCrew, setOpenCrew] = useState(false);
    const [openVariance, setOpenVariance] = useState(false);

    //input data 
    const [selectedStation, setSelectedStation] = useState('')
    const [selectedShiftManager, setSelectedShiftManager] = useState('')
    const [selectedShift, setSelectedShift] = useState('')

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
                    setSelectedStation={setSelectedStation}
                    setSelectedShiftManager={setSelectedShiftManager}
                    setSelectedShift={setSelectedShift}
                />

                {activeTab==="Daily Sales Input" && (
                    <DailySales 
                        openModeOfPayments={openModeOfPayments}
                        setOpenModeOfPayments={setOpenModeOfPayments}
                        openDepSales={openDepSales}
                        setOpenDepSales={setOpenDepSales}
                        openSupplements={openSupplements}
                        setOpenSupplements={setOpenSupplements}
                        openCrew={openCrew}
                        setOpenCrew={setOpenCrew}
                        openVariance={openVariance}
                        setOpenVariance={setOpenVariance}
                        inputFilter={{
                            date: effectivityDate,
                            station: selectedStation,
                            manager: selectedShiftManager,
                            shift: selectedShift
                        }}
                    />
                )}

                {activeTab==="Upload POS" && (
                    <UploadPOS />
                )}
            </div>
        </>
    )

}

export default SalesTransactions;
