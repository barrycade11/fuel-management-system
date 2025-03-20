import Tabs from "~/Components/Tabs";
import { SalesTabs } from "~/Constants/Labels";
import { useState } from "react";
import Navbar from "~/Components/Navbar"
import SalesFilter from "./Components/Salesfilter";
import FuelSalesInput from "./Components/FuelSalesInput";
import TaxTotals from "./Components/TaxTotals";
import TanksInput from "./Components/TanksInput";
import RandomButtons from "./Components/RandomButtons";

const SalesTransactions = () => {
    const [activeTab, setActiveTab] = useState(SalesTabs[0]);
    const [effectivityDate, setEffectivityDate] = useState(null);

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
                />

                <div className="grid lg:grid-cols-5 gap-14">
                    <div className="col-span-3">
                        <FuelSalesInput />
                    </div>
                    <div className="col-span-2">
                        <TaxTotals />
                    </div>
                </div>
                <br />
                <div className="grid lg:grid-cols-5 gap-14">
                    <div className="col-span-3">
                        <TanksInput />
                    </div>
                    <div className="col-span-2">
                        <RandomButtons />
                    </div>
                </div>
            </div>
        </>
    )

}

export default SalesTransactions;
