import Tabs from "~/Components/Tabs";
import { SalesTabs } from "~/Constants/Labels";
import { useState } from "react";
import Navbar from "~/Components/Navbar"
import SalesFilter from "./Components/SalesFilter";
import FuelSalesInput from "./Components/FuelSalesInput";
import TaxTotals from "./Components/TaxTotals";
import TanksInput from "./Components/TanksInput";
import RandomButtons from "./Components/RandomButtons";
import ModeOfPayments from "./Components/Modals/ModeOfPayments";
import DepartmentSales from "./Components/Modals/DepartmentSales";

const SalesTransactions = () => {
    const [activeTab, setActiveTab] = useState(SalesTabs[0]);
    const [effectivityDate, setEffectivityDate] = useState(null);
    const [openModeOfPayments, setOpenModeOfPayments] = useState(false);
    const [openDepSales, setOpenDepSales] = useState(false);

    return (
        <>
            <ModeOfPayments
                title={"Finalization Totals"}
                openModal={openModeOfPayments}
                setOpenModal={setOpenModeOfPayments}
            />
            <DepartmentSales
                title={"Department Sales"}
                openModal={openDepSales}
                setOpenModal={setOpenDepSales}
            />
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
                />

                <div className="grid lg:grid-cols-5 gap-14">
                    <div className="lg:col-span-3 grid gap-8">
                        <FuelSalesInput />
                        
                        <TanksInput />
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-8">
                        <div className="col-span-1">
                            <TaxTotals />
                        </div>
                        <div className="col-span-1">
                            <RandomButtons 
                                openModeOfPayments={openModeOfPayments}
                                setOpenModeOfPayments={setOpenModeOfPayments}
                                openDepSales={openDepSales}
                                setOpenDepSales={setOpenDepSales}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SalesTransactions;
